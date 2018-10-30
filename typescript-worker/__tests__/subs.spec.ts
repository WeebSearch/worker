import * as R from 'ramda';
import {
  filterText,
  isTextUsable,
  isValidSpeaker,
  isValidStyle, parseDialogues,
  processFileContent,
  processFilePathAsync
} from "../ingest/subs";
import { AssDialogue } from "../typings/ass-parser";

const EXAMPLE_FILE_LOCATION = 'resources/newgame.ass';

const dialogue: Partial<AssDialogue> = {
  Style: 'Main',
  Name: 'aoba',
  Text: {
    raw: "D-D-Don't tell me... you're thir—",
    combined: "D-D-Don't tell me... you're thir—",
    parsed: {
      drawing: [],
      tags: [],
      text: ''
    }
  }
};

test('processing file from path', async () => {
  const dialogues = await processFilePathAsync(EXAMPLE_FILE_LOCATION);
  expect(dialogues.length > 300).toBe(true);
});

test('filtering individual dialogues', async () => {
  const usable = isTextUsable(dialogue as AssDialogue);
  expect(usable).toBe(true);
});

test('selecting valid speaker', async () => {
  const usable = isValidSpeaker(dialogue as AssDialogue);
  expect(usable).toBe(true);

  const unusableInput = {
    ...dialogue,
    Name: 'on-screen'
  };
  const unusable = isValidSpeaker(unusableInput as AssDialogue);
  expect(unusable).toBe(false);
});

test('selecting valid speaker', async () => {
  const usable = isValidStyle(dialogue as AssDialogue);
  expect(usable).toBe(true);

  const unusableInput = {
    ...dialogue,
    Style: 'Sign'
  };
  const unusable = isValidStyle(unusableInput as AssDialogue);
  expect(unusable).toBe(false);
});

test('removing hard newlines from dialogues', async () => {
  const correct = filterText(dialogue as AssDialogue);
  expect(correct).toEqual(dialogue);

  const newDialogue = {
    ...dialogue,
    Text: {
      combined: '{\\i0}Hifumi\\Nis\nbae{\\i1}'
    }
  };
  const expected = {
    ...newDialogue,
    Text: {
      combined: 'Hifumiis\nbae'
    }
  };
  const incorrect = filterText(newDialogue as AssDialogue);
  expect(incorrect).toEqual(expected);
});

test('ordering subtitles', async () => {
  const dialogues = await processFilePathAsync(EXAMPLE_FILE_LOCATION);
  const ordered = parseDialogues(dialogues);

  const orderedTotal = R.compose(R.unnest, Object.values)(ordered);
  const speakers = Object.keys(ordered);

  expect(orderedTotal.length).toEqual(dialogues.length);
  expect(speakers.length).toBe(12);
});

