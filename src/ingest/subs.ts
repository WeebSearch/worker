import { compile, parse } from "ass-compiler";
import * as R from "ramda";
import { liftP } from "../tools/utils";
import { AssDialogue, AssFile, NameSortedDialogues, ParsedDialogue } from "../typings/ass-parser";
import { readSub } from "./file";
import { redisMemoize } from "./cache";

// declare const parse = (content: string): AssFile => parse(content);

/**
 * Control characters that appear for formatting
 *
 * Effect modifiers: {\i0}Hello{\i1}
 * Hard newline: \N
 */
export const CONTROL_CHARACTER_REGEX = /({\\.+?}|\\N)/g;
export const DEFAULT_SPEAKER = "__UNKNOWN__";
/**
 * Hard cap for cutting off dialogues in an episode
 * to prevent parsing millions of lines of trash subs
 */
export const DIALOGUE_HARD_CAP = 5000;

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
  INVALID_STYLES.every(speaker => R.toLower(speaker) !== R.toLower(dialogue.Style || ""))
  && !dialogue.Style.toLowerCase().includes('sign');

export const isValidSpeaker = (dialogue: AssDialogue) =>
  INVALID_SPEAKERS.every(speaker => R.toLower(speaker) !== R.toLower(dialogue.Name || ""));

export const filterText = (text: AssDialogue) => ({
  ...text,
  Text: {
    combined: text.Text.combined.replace(CONTROL_CHARACTER_REGEX, "").replace(/ ?\\N/, ' '),
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

export const processFileContent = (content: string) => {
  try {
    const sub = parseSub(content);
    const dialogues = getSubDialogues(sub);
    const usable = filterUsableTexts(dialogues as AssDialogue[]);
    const res = R.map(filterText)(usable);
    return res;
  } catch (e) {
    return [];
  }
};

type PathToDialoguesAsync = (path: string) => Promise<AssDialogue[]>;

export const processFilePathAsync: PathToDialoguesAsync = redisMemoize("processedSub", async path => {
  const sub = await readSub(path);
  return liftP(processFileContent)(sub);
});

export const createDialogue = (dialogue: AssDialogue, order): ParsedDialogue => ({
  name: dialogue.Name,
  start: Math.round(dialogue.Start),
  text: dialogue.Text.combined,
  end: Math.round(dialogue.End),
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

export const getEpisodeLength = (dialogues: AssDialogue[]) => {
  const result = Math.max(...dialogues.map(dialogue => dialogue.End));
  return result !== -Infinity ? result : 0;
}

export const hardCapDialogues = <T>(dialogues: T[]) => dialogues.slice(0, DIALOGUE_HARD_CAP);

