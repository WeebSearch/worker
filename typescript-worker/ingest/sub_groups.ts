import * as R from "ramda";
import { tally } from "../tools/utils";
import { FileMatches, Grouped, MatchedFile } from "../typings/ass-parser";
import { parseFileName } from "./file";

const { freeze } = Object;

/**
 * Subtitles come in the following form, we have to stick to this
 * standard because otherwise it becomes impossible to parse any sort
 * of file name. Everything is an exception to the rule in a way...
 *
 * @example [subGroup] name - episode - [720p] [something hud dur].ass
 */
export const GENERIC_SUB_REGEX = /\[(.+)\] (.+) - (.+?) [\[(]/;

/**
 * Sub groups we don't want to use
 */
export const BLACKLISTED_GROUPS = freeze([
  "__PLACEHOLDER__"
]);

/**
 * Subtitle files that we accept, these could include
 *
 * - ass
 * - srt
 * - sub
 */
export const VALID_FILE_TYPES = freeze([
  ".ass"
]);

/**
 * Certain sub groups are better than others
 * but sometimes the top sub group does not
 * have enough files, so we need weights to be
 * able to accurately compare them
 */
export const SUB_GROUP_WEIGHTS = freeze({
  HorribleSubs: 10,
  EraiRaws: 8.4
});

export const DEFAULT_SUB_GROUP_WEIGHT = 5;

export const hasSubtitleFormat = R.pipe(
  R.match(GENERIC_SUB_REGEX),
  R.isEmpty,
  R.not
);

export const isValidSubGroup = (file: string) => {
  const match = file.match(GENERIC_SUB_REGEX);
  if (!match) {
    return false;
  }
  const [, group] = match;
  return !R.contains(group, BLACKLISTED_GROUPS);
};

export const hasValidSubtitleEnding = (file: string) =>
  R.any(type => R.endsWith(type, file), VALID_FILE_TYPES);


export const isValidSubFile = (file: string) => [
  isValidSubGroup, hasValidSubtitleEnding, hasSubtitleFormat
].every(fn => fn(file));

export const groupBySubGroup = (files: FileMatches): Grouped<string> => R.reduce((collector, [subGroup, filePath]) => {
  const obj = collector[subGroup] ? collector : {
    ...collector,
    [subGroup]: []
  };
  obj[subGroup].push(filePath);
  return obj;
}, {})(files);

export const extractSubGroup = (filePath: string) => parseFileName(filePath).shift();

export const filterDuplicateFiles = (matches: MatchedFile[]) =>
  matches.reduce((coll: MatchedFile[], item: MatchedFile) => {
    const [subGroup, _, ep] = item;
    if (!coll.find((match: MatchedFile) => match[0] === subGroup && match[2] === ep)) {
      coll.push(item);
    }
    return coll;
  }, []);

type Group = [string, number];
/**
 * Finds the most suitable sub group in a folder, taking into account
 * preference of one group over the other and how many files are
 * available from each group
 * @param tallied
 */
export const findBestSubGroup = (tallied: Tallied): string =>
  Object.entries(tallied).reduce((coll: Group, [key, value]: Group) => {
    const [previousGroup, previousAmount] = coll;
    // The amount each sub group is worth
    const multiplier = SUB_GROUP_WEIGHTS[key] || DEFAULT_SUB_GROUP_WEIGHT;
    const currentAmount = value * multiplier;
    const isBestSubGroup = currentAmount > previousAmount;
    return isBestSubGroup ? [
      key,
      currentAmount
    ] : [
      previousGroup,
      previousAmount
    ];
  }, ["UNKNOWN", -1])[0];

/**
 * Filtering a list of paths or file names to only use the best
 * suitable sub groups
 * @param matchingFiles
 */
export const filterUsableSubs = (matchingFiles: string[]): string[] => {
  const isNotNil = item => !R.isNil(item);
//
  const subGroups = matchingFiles.map(parseFileName);
//
//   const existingSubGroups = subGroups.filter(isNotNil);
//   const singular = filterDuplicateEpisodes(existingSubGroups as MatchedFile[]);
//
  const tallied = tally(subGroups.map(a => a[0]));
  const bestSubGroup = findBestSubGroup(tallied);
//
  return matchingFiles.filter(matching => parseFileName(matching).shift() === bestSubGroup);
};
