import { searchMALIdByRawName } from "../resolvers/anime_resolver";

jest.mock('graphql-request');

// request = () => ''
test('search correctly attempts to search', async () => {
  // expect();
  expect(
    await searchMALIdByRawName('New Game!')
  ).toBe(31953);

});
