import { compile, parse } from "ass-compiler";
import * as R from "ramda";
import { searchMALIdByRawName } from "../resolvers/anime_resolver";
import { fetchCharacters, matchCharacters } from "../resolvers/character_resolver";
import { AssDialogue, AssFile, NameSortedDialogues, ParsedDialogue } from "../typings/ass-parser";
import { createAnime, createArchive } from "./db";
import { extract, parseFileName, readSub } from "./file";
import { filterUsableSubs } from "./sub_groups";

// declare const parse = (content: string): AssFile => parse(content);

/**
 * Control characters that appear for formatting
 *
 * Effect modifiers: {\i0}Hello{\i1}
 * Hard newline: \N
 */
const CONTROL_CHARACTER_REGEX = /({\\.+?}|\\N)/g;
const DEFAULT_SPEAKER = "__UNKNOWN__";

export const INVALID_SPEAKERS = Object.freeze([
  "on-screen"
]);

export const INVALID_STYLES = Object.freeze([
  "Sign",
  "OP",
  "ED"
]);

export const parseSub: (content: string) => AssFile = parse;

export const getSubDialogues = (file: AssFile): ReadonlyArray<AssDialogue> => file.events.dialogue;


export const isValidStyle = (dialogue: AssDialogue) =>
  INVALID_STYLES.every(speaker => R.toLower(speaker) !== R.toLower(dialogue.Style));

export const isValidSpeaker = (dialogue: AssDialogue) =>
  INVALID_SPEAKERS.every(speaker => R.toLower(speaker) !== R.toLower(dialogue.Name));

export const filterText = (text: AssDialogue) => ({
  ...text,
  Text: {
    combined: text.Text.combined.replace(CONTROL_CHARACTER_REGEX, ""),
    ...(text.Text)
  }
});

const lineConditions = (dialogue: AssDialogue) => {
  const unfiltered = dialogue.Text.combined;
  // lazy evaluation
  return [
    () => unfiltered.length < 200,
    () => !R.isEmpty(unfiltered),
    () => !unfiltered.startsWith("{+"),
    () => isValidSpeaker(dialogue),
    () => isValidStyle(dialogue)
    // () => unfiltered.length < Math.floor(filterText(unfiltered).length * 1.6)
  ];
};

export const isTextUsable = (dialogue: AssDialogue): boolean =>
  lineConditions(dialogue).every(func => func());

export const filterUsableTexts: (arr: AssDialogue[]) => AssDialogue[] = R.filter(isTextUsable);

type FileToDialogues = (content: string) => AssDialogue[];

export const processFileContent: FileToDialogues = R.pipe(
  parseSub,
  getSubDialogues,
  filterUsableTexts,
  R.map(filterText)
);

type PathToDialoguesAsync = (path: string) => Promise<AssDialogue[]>;

export const processFilePathAsync: PathToDialoguesAsync = R.pipeP(
  readSub,
  async sub => processFileContent(sub)
);

export const createDialogue = (dialogue: AssDialogue, order): ParsedDialogue => ({
  name: dialogue.Name,
  start: dialogue.Start,
  text: dialogue.Text.combined,
  end: dialogue.End,
  order
});

export const parseDialogues = (dialogues: AssDialogue[]): NameSortedDialogues =>
  dialogues.reduce(
    (acc: [NameSortedDialogues, number], dialogue: AssDialogue) => {
      const [collector, order] = acc;
      const { Name } = dialogue;
      const target = Name || DEFAULT_SPEAKER;

      const obj = collector[target] ? collector : {
        ...collector,
        [target]: []
      };
      // MUTATION? DISGUSTING
      const parsed = createDialogue(dialogue, order);
      obj[target].push(parsed);
      return [obj, order + 1];
    }, [{}, 0])[0];


(async () => {
  // console.log(Rar)
  // const target = 'downloads/New_Game_TV_2016_Eng/[HorribleSubs] New Game! - 01 [720p].ass';
  const archive = "downloads/New_Game_TV_2016_Eng.rar";
  try {
    const filePaths = await extract(archive);
    const filteredPaths = filterUsableSubs(filePaths);
    const [group, anime, episode] = parseFileName(filteredPaths[0]);
    console.log(filteredPaths[0]);
    console.log(anime, group, episode);
    const nameSearch = searchMALIdByRawName(anime);

    const now = Date.now();
    // An array of promises per file, containing dialogues of each file

    console.log(nameSearch);
    // return;
    const promises: Array<Promise<AssDialogue[]>> = filteredPaths.map(processFilePathAsync);

    // important: Typescript can't resolve spreads with tuples properly
    // @ts-ignore
    const [malId, ...filteredDialogues]: [number, ...AssDialogue[][]] = await Promise.all([nameSearch, ...promises]);

    const characters = await fetchCharacters(malId);
    const chars = characters && characters.Media.characters.nodes;
    const anilistId = characters && characters.Media.id;
    console.log(malId);
    console.log(anilistId);
    const matchAnimeCharacters = R.curry(matchCharacters)(chars);

    const characterMatchPipe = R.pipe(parseDialogues, Object.keys, matchAnimeCharacters);
    const matches = filteredDialogues.map(characterMatchPipe);
    // createAnime({ anilistId, malId, rawName: anime });
    // createArchive({
    //   linkUrl
    // })

    // const parsed = filteredDialogues.map(parseDialogues);
    // const dialogueCharacters = parsed.map(Object.keys);
    // const matches = dialogueCharacters.map(matchAnimeCharacters);
    console.log(characters);
    // console.log(characters);
    // console.log(search);
    // const groupedDialogues = filteredDialogues.map(parseDialogues);
    // console.log(Object.keys(groupedDialogues[1]));


    // parseDialogues(filteredDialogues[0]);

    // console.log(filteredDialogues.pop());
    // console.log(filteredDialogues)
    // console.log("time", Date.now() - now);

    // console.log(await processFilePathAsync(bb[0]));


  } catch (err) {
    console.log("something wrong");
    console.log(err);
  }
  // const dialogues = bb.map(parseAndExtract)

  // console.log(dialogues[0])
  // const fileStr: string = (await readFileAsync()).toString()
  // const file: AssFile = parse(fileStr)
  // console.log(JSON.stringify(file.events.dialogue.slice(100, 120), null, 4))
  // console.log(file)
  // console.log(parse(file))
})();

