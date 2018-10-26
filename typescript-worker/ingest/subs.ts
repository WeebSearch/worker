import { compile, parse } from 'ass-compiler';
import * as R from 'ramda';
import { searchMALIdByRawName } from "../resolvers/anime_resolver";
import { AssDialogue, AssFile, NameSortedDialogues } from "../typings/ass-parser";
import { parseFileName, readSub, unrar } from "./file";
import { filterUsableSubs } from "./sub_groups";

// declare const parse = (content: string): AssFile => parse(content);

/**
 * Control characters that appear for formatting
 *
 * Effect modifiers: {\i0}Hello{\i1}
 * Hard newline: \N
 */
const CONTROL_CHARACTER_REGEX = /({\\.+?}|\\N)/g;
const DEFAULT_SPEAKER = '__UNKNOWN__';

export const INVALID_SPEAKERS = Object.freeze([
  'on-screen'
]);

export const INVALID_STYLES = Object.freeze([
  'Sign',
  'OP',
  'ED'
]);

export const parseSub: (content: string) => AssFile = parse;

export const getSubDialogues = (file: AssFile): AssDialogue[] => file.events.dialogue;


export const isValidStyle = (dialogue: AssDialogue) =>
  INVALID_STYLES.every(speaker => R.toLower(speaker) !== R.toLower(dialogue.Style));

export const isValidSpeaker = (dialogue: AssDialogue) =>
  INVALID_SPEAKERS.every(speaker => R.toLower(speaker) !== R.toLower(dialogue.Name));

export const filterText = (text: AssDialogue) => {
  text.Text.combined = text.Text.combined.replace(CONTROL_CHARACTER_REGEX, '');
  return text;
};

const lineConditions = (dialogue: AssDialogue) => {
  const unfiltered = dialogue.Text.combined;
  // lazy evaluation
  return [
    () => unfiltered.length < 200,
    () => !R.isEmpty(unfiltered),
    () => !unfiltered.startsWith('{+'),
    () => isValidSpeaker(dialogue),
    () => isValidStyle(dialogue),
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

export const orderBySpeaker = R.reduce((acc: { [name: string]: AssDialogue[] }, dialogue: AssDialogue) => {
  const name = dialogue.Name || DEFAULT_SPEAKER;
  if (!acc[name]) {
    acc[name] = [];
  }
  acc[name].push(dialogue);
  return acc;
}, {});


export const parseDialogues: (_: AssDialogue[]) =>
  NameSortedDialogues = R.reduce((acc: NameSortedDialogues, dialogue: AssDialogue) => {
  const name = dialogue.Name;
  if (!acc[name]) {
    acc[name] = [];
  }
  acc[name] = [...acc[name], dialogue];

  return acc;
}, {});



(async () => {
  // console.log(Rar)
  // const target = 'downloads/New_Game_TV_2016_Eng/[HorribleSubs] New Game! - 01 [720p].ass';
  const archive = 'downloads/New_Game_TV_2016_Eng.rar';
  try {
    const filePaths = await unrar(archive);
  const [group, anime, episode] = parseFileName(filePaths[0]);
  // console.log(anime, group, episode);
  // const nameSearch = searchMALIdByRawName(anime);

  const now = Date.now();
  // An array of promises per file, containing dialogues of each file
    console.log(filePaths)
  return console.log(filterUsableSubs(filePaths))
  const promises: Array<Promise<AssDialogue[]>> = filePaths.map(processFilePathAsync);

  // important: Typescript can't resolve spreads with tuples properly
  // @ts-ignore
  const [search, ...filteredDialogues]: [number, ...AssDialogue[][]] = await Promise.all([nameSearch, ...promises]);

  console.log(search);
  const groupedDialogues = filteredDialogues.map(parseDialogues);
  console.log(Object.keys(groupedDialogues[0]));
  // parseDialogues(filteredDialogues[0]);

  // console.log(filteredDialogues.pop());
  // console.log(filteredDialogues)
  // console.log(parseDialogues(filteredDialogues[0]));
  // console.log("time", Date.now() - now);

  // console.log(await processFilePathAsync(bb[0]));


  } catch (err) {
    console.log('something wrong')
    console.log(err)
  }
  // const dialogues = bb.map(parseAndExtract)

  // console.log(dialogues[0])
  // const fileStr: string = (await readFileAsync()).toString()
  // const file: AssFile = parse(fileStr)
  // console.log(JSON.stringify(file.events.dialogue.slice(100, 120), null, 4))
  // console.log(file)
  // console.log(parse(file))
})();

