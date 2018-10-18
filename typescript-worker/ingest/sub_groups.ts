import * as R from "ramda";

const GENERIC_SUB_REGEX = /\[(.+)\] (.+) - (.+?) [\[(]/;

const BLACKLISTED_GROUPS = Object.freeze([
  '__PLACEHOLDER__'
]);

const VALID_FILE_TYPES = Object.freeze([
  '.ass'
]);

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
