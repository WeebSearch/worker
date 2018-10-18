import { readSub } from "../ingest/file";
import { processFileContent } from "../ingest/subs";

const EXAMPLE_FILE_LOCATION = 'resources/newgame.ass';
test('processing file content', () => {
  console.log(processFileContent(EXAMPLE_FILE_LOCATION).length)
});
