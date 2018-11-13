import * as R from "ramda";
import { searchMALIdByRawName } from "../resolvers/anime_resolver";
import { fetchCharacters, matchCharacters, safeJoinName } from "../resolvers/character_resolver";
import { logger } from "../tools/logging";
import { forEachAsync } from "../tools/utils";
import { FuseMatch, NameSortedDialogues } from "../typings/ass-parser";
import { CharacterCommit, CommitPayload, DialogueCommit, PartialPayload } from "../typings/db";
import { AnilistCharacter } from "../typings/http";
import { createAnime, createArchive, createFile, getAnime, getFile, upsertCharacter } from "./db";
import { extract, extractFileName, isArchive } from "./file";
import { filterUsableSubs } from "./sub_groups";
import { DEFAULT_SPEAKER, getEpisodeLength, parseDialogues, processFilePathAsync } from "./subs";

/**
 * Processing of the files after they are downloaded and sorted by the
 * downloader
 * @param files
 */
export const processSavedFiles = async (files: PartialPayload[]): Promise<void> => {
  const extractionsPromise = files.map(async file => {
    const { path } = file;
    const filePath = path;
    if (isArchive(filePath)) {
      const extractedPaths = await extract(filePath);
      logger.error(path);
      return extractedPaths.map(extracted => ({
        ...file,
        path: extracted,
        archivePath: filePath
      }));
    }
    return [file];
  });

  // @ts-ignore
  const extractedFiles: { readonly [k: string]: PartialPayload[] } = await Promise.all(extractionsPromise)
    .then(nesteds => nesteds.reduce(R.concat, []))
    .then(filterUsableSubs)
    .then(e => e.reduce((coll, item) => ({
      ...coll,
      [item.animeName]: coll[item.animeName] ? [...coll[item.animeName], item] : [item]
    }), {}));
  logger.info("Extracted all files");

  const promises = Object.entries(extractedFiles).map(async ([anime, payloads]) => {
    const malId = await searchMALIdByRawName(anime);
    const characters = await fetchCharacters(malId);

    return Promise.all(payloads.map(async payload => {
      const { path } = payload;
      const anilistId = characters && characters.Media.id;
      const thumbnailUrl = characters && characters.Media.coverImage.large;
      const chars = characters && characters.Media.characters.nodes;

      const fileName = extractFileName(path);
      const dialogues = await processFilePathAsync(path);
      const episodeLength = getEpisodeLength(dialogues);

      const matchAnimeCharacters = R.curry(matchCharacters)(chars);
      const parsedDialogue = parseDialogues(dialogues);
      const characterMatchPipe = R.pipe(Object.keys, matchAnimeCharacters);
      const matches = characterMatchPipe(parsedDialogue);

      return {
        ...payload,
        anilistId,
        malId,
        thumbnailUrl,
        fileName,
        episodeLength,
        file: {
          dialogues: parsedDialogue,
          characters: matches
        }
      };
    }));
  });
  const finalPayloads = await Promise.all(promises);
  await forEachAsync(async finalPayload => {
    const [item] = finalPayload;
    const resp = await getAnime(item.animeName);
    // TODO: at some point our sources will not come from archives
    const archive = item.archivePath && await createArchive({
      linkUrl: item.downloadUrl,
      fileName: extractFileName(item.archivePath)
    });

    const animeId = resp.anime && resp.anime.id;
    // @ts-ignore (idk why it thinks archive is still undefined after checking)
    const archiveId = archive && archive.createArchive.id;
    // const archiveId = archive && archive.

    // @ts-ignore
    return commitFileEntity(finalPayload, animeId, archiveId);
  }, finalPayloads);
};

const stitchCharacterDialogues = (
  matches: Array<FuseMatch<AnilistCharacter>>,
  animeId: string,
  episodeId: string,
  parsedPayload: NameSortedDialogues
): CharacterCommit[] => Object.entries(parsedPayload).map(([name, dialogues]) => {
  const matchingPayload = matches.find(match => match[0] === name);
  const [, character] = matchingPayload;

  const fullName = character
    && safeJoinName(character.item.name.first, character.item.name.last);

  const newDialogues: DialogueCommit[] = dialogues.map(dialogue => {
    const { name: _, ...anonymousDialogue } = dialogue;
    return {
      ...anonymousDialogue,
      anime: {
        connect: {
          id: animeId
        }
      },
      episode: {
        connect: {
          id: episodeId
        }
      }
    };
  });

  return {
    dialogues: newDialogues,
    rawName: name,
    name: fullName,
    episodes: {
      connect: {
        id: episodeId
      }
    }
  };
});

const commitFileEntity = async (
  files: CommitPayload[],
  existingAnimeId?: string,
  existingArchiveId?: string
) => {
  const [head, ...tail] = files;
  if (!head) {
    return;
  }
  const {
    subGroup, episode, downloadUrl, fileName,
    anilistId, malId, animeName, episodeLength, thumbnailUrl,
    file: currentFile
  } = head;

  const fileRequest = await getFile(fileName);
  const fileAlreadySaved = fileRequest && fileRequest.file && fileRequest.file.id;
  if (fileAlreadySaved) {
    logger.info(`File ${fileName} was already processed at ${fileRequest.file.updatedAt}, skipping...`);
    // What if we have the wrong anime id here?
    return commitFileEntity(tail, existingAnimeId, existingArchiveId);
  }
  const animeId = existingAnimeId ||
    await createAnime({ anilistId, malId, rawName: animeName, thumbnailUrl })
      .then(e => e && e.createAnime && e.createAnime.id);

  const archive = existingArchiveId && {
    archive: {
      connect: {
        id: existingArchiveId
      }
    }
  } || {};

  const params = {
    linkUrl: downloadUrl,
    fileName,
    anime: { connect: { id: animeId } },
    ...archive,
    episode: {
      create: {
        episodeNumber: episode,
        displayName: animeName,
        subGroup,
        // TODO: don't hardcode this, we want japanese subtitles later
        language: "EN",
        length: Math.floor(episodeLength),
        anime: {
          connect: { id: animeId }
        }
      }
    }
  };

  const episodeId = await createFile(params).then(res =>
    res && res.createFile && res.createFile.episode.id
  );

  const finalCharacters = await Promise.all(stitchCharacterDialogues(
    currentFile.characters,
    animeId,
    episodeId,
    currentFile.dialogues
  ));

  await forEachAsync(async character => upsertCharacter({
    where: {
      anilistId: character.anilistId || 0 // create, not upsert
    },
    update: {
      dialogues: {
        create: character.dialogues
      }
    },
    create: {
      ...character,
      dialogues: {
        create: character.dialogues
      }
    }
  }), finalCharacters);
  return commitFileEntity(tail, animeId, existingArchiveId);
};

