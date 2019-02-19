import * as R from "ramda";
import { searchMALIdByRawName } from "../resolvers/anime_resolver";
import { fetchCharacters, matchCharacters, safeJoinName } from "../resolvers/character_resolver";
import { logger } from "../tools/logging";
import { filterEmpty, forEachAsync } from "../tools/utils";
import { CommitPayload, PartialPayload } from "../typings/db";
import { extract, extractFileName, isArchive } from "./file";
import { attachFileMetadata, filterUsableSubs } from "./sub_groups";
import { getEpisodeLength, hardCapDialogues, parseDialogues, processFilePathAsync } from "./subs";

interface NameSortedSubs {
  readonly [k: string]: PartialPayload[];
}

const separateByName = (subs: PartialPayload[]) => subs.reduce((coll, item) => {
  const { animeName } = item;
  // invalid anime name
  if (!animeName) {
    return coll;
  }
  const anime = coll[animeName];
  return {
    ...coll,
    [animeName]: anime ? [...anime, item] : [item]
  };
}, {}) as NameSortedSubs;


export const extractAndSeparate = async (files: PartialPayload[]) => {
  const extractionsPromise = files.map(async file => {
    const { path } = file;
    if (isArchive(path)) {
      const extractedPaths = await extract(path);
      return extractedPaths.map(extracted => ({
        ...file,
        path: extracted,
        archivePath: path
      }));
    }
    return [file];
  });

  // @ts-ignore
  const extractedFiles = await Promise.all(extractionsPromise);
  const concated = extractedFiles.reduce(R.concat, []);
  const populated = filterUsableSubs(concated.map(attachFileMetadata));
  return separateByName(populated);
};

export const processSortedSubs = (subs: NameSortedSubs) => Object.entries(subs).map(async ([anime, payloads]) => {
  const malId = await searchMALIdByRawName(anime);
  const characters = await fetchCharacters(malId);
  // sometimes malId exists but anilist does not have it
  if (!characters) {
    return Promise.resolve([]);
  }

  return Promise.all(payloads.map(async payload => {
    const { path } = payload;
    const anilistId = characters && characters.Media && characters.Media.id;
    const thumbnailUrl = characters && characters.Media && characters.Media.coverImage.large;
    const chars = characters && characters.Media && characters.Media.characters.nodes;

    const fileName = extractFileName(path);
    const dialogues = await processFilePathAsync(path);
    const cappedDialogues = hardCapDialogues(dialogues);
    const episodeLength = getEpisodeLength(cappedDialogues);

    const matchAnimeCharacters = R.curry(matchCharacters)(chars);
    const parsedDialogue = parseDialogues(cappedDialogues);
    const matches = matchAnimeCharacters(Object.keys(parsedDialogue));

    return {
      ...payload,
      anilistId,
      malId,
      thumbnailUrl,
      fileName,
      episodeLength,
      dialogues: parsedDialogue,
      characters: matches
    };
  }));
});

/**
 * Processing of the files after they are downloaded and sorted by the
 * downloader
 * @param files
 */
export const processSavedFiles = async (files: PartialPayload[]): Promise<void> => {
  const separated = await extractAndSeparate(files);
  logger.info("Extracted all files");
  const promises = processSortedSubs(separated);

  const animeGroups = await Promise.all(promises).then(filterEmpty) as CommitPayload[][];
  return commitAnimes(animeGroups);
};

const commitEpisodeGroups = (files: CommitPayload[], { downloadId, animeId, transaction }) =>
  Promise.all(files.map(async (file: CommitPayload) => {
    const epValues = {
      name: file.fileName,
      episodeNumber: file.episode,
      subGroup: file.subGroup
    };

    const [episode, created] = await Episode.findOrCreate<Episode>({
      where: epValues,
      defaults: {
        ...epValues,
        length: file.episodeLength,
        animeId,
        downloadId,
        episodeNumber: file.episode,
      },
      transaction
    });

    // no need to upsert characters for a duplicate episode
    if (!created) {
      return [];
    }

    return Promise.all(file.characters.map(async ([charName, char]) => {
      const safeName = char && safeJoinName(char.item.name.first, char.item.name.last);
      const anilistId = char && Number(char.item.id);
      const [character] = anilistId && await Character.findOrCreate<Character>({
        where: {
          anilistId
        },
        defaults: {
          anilistId,
          name: safeName,
          thumbnailUrl: char && char.item.image.medium
        },
        transaction
      }) || [{ id: undefined }];

      const discoveryValues = { episodeId: episode.id, name: charName };
      const [discovery] = await CharacterDiscovery.findOrCreate<CharacterDiscovery>({
        where: discoveryValues,
        defaults: {
          ...discoveryValues,
          characterId: character.id,
          certainty: char && char.score * 100 || 0
        },
        transaction
      });
      const dialogues = file.dialogues[charName].map(({ text, start, end, order, name }) => {
        return {
          text,
          start,
          end,
          order,
          animeId,
          name,
          episodeId: episode.id,
          characterId: discovery.id
        };
      });
      return Dialogue.bulkCreate<Dialogue>(dialogues, { transaction });
    }));
  }));


/**
 * If the anilist id is missing for animes that means
 * we are going to end up with potentially multiple
 * copies of the same anime which will have to be
 * manually addressed at a later point
 */
const commitAnimes = async (files: CommitPayload[][]) =>
  forEachAsync(async episodes => {
    return sequelize.transaction(async transaction => {
      const [item] = episodes;

      const [anime] = await Anime.findOrCreate<Anime>({
        where: { anilistId: item.anilistId },
        defaults: {
          rawName: item.animeName,
          anilistId: item.anilistId,
          thumbnailUrl: item.thumbnailUrl,
          malId: item.malId
        },
        transaction
      });

      const downloadValues = { url: item.downloadUrl };
      const [download] = item.downloadUrl && await Download.findOrCreate<Download>({
        where: downloadValues,
        defaults: downloadValues,
        transaction
      }) || [{ id: undefined }];


      return commitEpisodeGroups(episodes, {
        animeId: anime.id,
        downloadId: download.id,
        transaction
      });
    });
  }, files);
