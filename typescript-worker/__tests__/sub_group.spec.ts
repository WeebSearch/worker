import { hasSubtitleFormat, hasValidSubtitleEnding, isValidSubFile, isValidSubGroup } from "../ingest/sub_groups";

const VALID_SUB = '[SubGroup] Title - Ep5 [720x].ass';
test('sanity', () => {
  expect(1 + 1).toBe(2);
});

test('subtitle format', () => {
  expect(hasSubtitleFormat(VALID_SUB)).toBe(true);
  expect(hasSubtitleFormat('[123] Something Wrong [720].ass')).toBe(false);
});

test('sub group matching', () => {
  expect(isValidSubGroup(VALID_SUB)).toBe(true);
  expect(isValidSubGroup('[__PLACEHOLDER__] Something Wrong [720].ass')).toBe(false);
});

test('subtitle ending checks', () => {
  expect(hasValidSubtitleEnding(VALID_SUB)).toBe(true);
  expect(hasValidSubtitleEnding('[Group] Title - Episode [720].srt')).toBe(false);
});

test('valid sub file pipe check', () => {
  expect(isValidSubFile(VALID_SUB)).toBe(true);
  expect(isValidSubFile('[Group] Title - Episode [720].srt')).toBe(false);
});
