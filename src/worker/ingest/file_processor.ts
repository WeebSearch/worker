import * as R from "ramda";
import { searchMALIdByRawName } from "../resolvers/anime_resolver";
import { fetchCharacters, matchCharacters } from "../resolvers/character_resolver";
import { logger } from "../tools/logging";
import { forEachAsync } from "../tools/utils";
import { PartialPayload } from "../typings/db";
import { createArchive, getAnime } from "./db";
import { extract, extractFileName, isArchive } from "./file";
import { attachFileMetadata, filterUsableSubs } from "./sub_groups";
import { getEpisodeLength, parseDialogues, processFilePathAsync } from "./subs";

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
  const populated = concated.map(attachFileMetadata);
  return separateByName(populated);
};

/**
 * Processing of the files after they are downloaded and sorted by the
 * downloader
 * @param files
 */
export const processSavedFiles = async (files: PartialPayload[]): Promise<void> => {
  const separated = await extractAndSeparate(files);
  logger.info("Extracted all files");

  const promises = Object.entries(separated).map(async ([anime, payloads]) => {
    const validAnimes = filterUsableSubs(payloads);
    const malId = await searchMALIdByRawName(anime);
    const characters = await fetchCharacters(malId);
    // sometimes malId exists but anilist does not have it
    if (!characters) {
      return Promise.resolve([]);
    }

    return Promise.all(validAnimes.map(async payload => {
      const { path } = payload;
      const anilistId = characters && characters.Media.id;
      const thumbnailUrl = characters && characters.Media.coverImage.large;
      const chars = characters && characters.Media.characters.nodes;

      const fileName = extractFileName(path);
      const dialogues = await processFilePathAsync(path);
      const episodeLength = getEpisodeLength(dialogues);

      const matchAnimeCharacters = R.curry(matchCharacters)(chars);
      const parsedDialogue = parseDialogues(dialogues);
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
  const finalPayloads = await Promise.all(promises).then(arrays => arrays.filter(Boolean));
  console.log("payloaded");
  await forEachAsync(async finalPayload => {
    const [item] = finalPayload;
    const resp = await getAnime(item.animeName);

    // TODO: at some point our sources will not come from archives
    const archive = item.archivePath && await createArchive({
      linkUrl: item.downloadUrl,
      fileName: extractFileName(item.archivePath)
    });

    const animeId = resp && resp.id;
    // @ts-ignore (idk why it thinks archive is still undefined after checking)
    const archiveId = archive && archive.createArchive.id;
    // const archiveId = archive && archive.
    //
    // // @ts-ignore
    // return commitFileEntity(finalPayload, animeId, archiveId);
  }, finalPayloads);
};
