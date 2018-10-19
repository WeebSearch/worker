import { filterText, isTextUsable, processFileContent, processFilePathAsync } from "../ingest/subs";
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
