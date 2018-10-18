import { compile, parse } from 'ass-compiler';
import * as fs from "fs";
import * as R from 'ramda';
import { promisify } from "util";
import { toPromise } from "../tools/utils";
import { AssDialogue, AssFile } from "../typings/ass-parser";
import { readSub, unrar } from "./file";

// declare const parse = (content: string): AssFile => parse(content);

/**
 * Control characters that appear for formatting
 *
 * Effect modifiers: {\i0}Hello{\i1}
 * Hard newline: \N
 */
const CONTROL_CHARACTER_REGEX = /({\\.+?}|\\N)/g;

const INVALID_SPEAKERS = Object.freeze([
  'on-screen'
]);

const INVALID_STYLES = Object.freeze([
  'Sign',
  'OP',
  'ED'
]);

const parseSub: (content: string) => AssFile = parse;

const getSubDialogues = (file: AssFile): AssDialogue[] => file.events.dialogue;


const isValidStyle = (dialogue: AssDialogue) =>
  INVALID_STYLES.map(R.toLower).every(speaker => R.toLower(speaker) !== dialogue.Style);

const isValidSpeaker = (dialogue: AssDialogue) =>
  INVALID_SPEAKERS.map(R.toLower).every(speaker => R.toLower(speaker) !== dialogue.Name);

const filterText = (text: AssDialogue) => {
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

const isTextUsable = (dialogue: AssDialogue): boolean =>
  lineConditions(dialogue).every(func => func());

const filterUsableTexts: (arr: AssDialogue[]) => AssDialogue[] = R.filter(isTextUsable);

type FileToDialogues = (content: string) => AssDialogue[];

export const processFileContent: FileToDialogues = R.pipe(
  parseSub,
  getSubDialogues,
  filterUsableTexts,
  R.map(filterText)
);

type PathToDialoguesAsync = (path: string) => Promise<AssDialogue[]>;

const processFilePathAsync: PathToDialoguesAsync = R.pipeP(
  readSub,
  async sub => processFileContent(sub)
);

(async () => {
  // console.log(Rar)
  const target = 'downloads/New_Game_TV_2016_Eng/[HorribleSubs] New Game! - 01 [720p].ass';
  // console.log(unpack)
  const archive = 'downloads/New_Game_TV2_2017_Eng.rar';
  const filePaths = await unrar(archive);
  // console.log(x)
  const bb: string[] = await Promise.all(filePaths.map(readSub));
  // console.log(bb[0])



  const now = Date.now();
  const promises = filePaths.map(processFilePathAsync);
  const filteredDialogues = await Promise.all(promises);
  console.log(filteredDialogues.pop());
  console.log("time", Date.now() - now);

  // console.log(await processFilePathAsync(bb[0]));


  // const dialogues = bb.map(parseAndExtract)

  // console.log(dialogues[0])
  // const fileStr: string = (await readFileAsync()).toString()
  // const file: AssFile = parse(fileStr)
  // console.log(JSON.stringify(file.events.dialogue.slice(100, 120), null, 4))
  // console.log(file)
  // console.log(parse(file))
})();

