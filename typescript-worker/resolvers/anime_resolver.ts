import axios, { AxiosResponse } from 'axios';
import * as R from 'ramda';
import { MalHintSearchResponse } from "../typings/http";
import { fetchCharactersByMalId } from "./character_resolver";

export const MAL_HINT_ENDPOINT = 'https://myanimelist.net/search/prefix.json?type=anime&keyword=';

export const extractAnimesFromResponse = (resp: AxiosResponse<MalHintSearchResponse>) => {
  const { data } = resp;
  if (!data) {
    return;
  }
  const { categories } = data;
  if (!categories) {
    return;
  }
  const category = categories.find(cat => cat.type === 'anime');
  if (!category) {
    return;
  }
  return category.items;
};

export const searchMALIdByRawName = async (rawName: string): Promise<number | undefined> => {
  const response = await axios.get(MAL_HINT_ENDPOINT + rawName);
  const animes = extractAnimesFromResponse(response);
  // MAL Elasticsearch doesn't check full matches, so we check instead
  const fullMatch = animes.find(anime => anime.name.toLowerCase() === rawName.toLowerCase());

  const target = fullMatch || animes.shift();
  return target.id;
};

// searchMALIdByRawName('New Game!').then(fetchCharactersByMalId).then(R.pipe(JSON.stringify, console.log));
