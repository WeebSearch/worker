import { parseFileName } from "../ingest/file";

test('parsing names properly', () => {
  const testName = '[HorribleSubs] New Game! - 01 [720p].ass';
  const [group, name, ep] = parseFileName(testName);
  expect(group).toEqual('HorribleSubs');
  expect(name).toEqual('New Game!');
  expect(ep).toEqual('01');
});
