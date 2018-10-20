import axios, { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';
import * as R from "ramda";
import { processSubsComRu } from "../ingest/downloader";
import { RESPECT_ROBOTS_TXT, USER_AGENT } from "./settings";
import { QuerySelector, SpiderOptions } from "./spidey";

axios.defaults.headers.withCredentials = true;
/**
 * Allows us to persist cookies
 */
export const request = axios.create({
  // withCredentials: true,
  // maxRedirects: 0,
  headers: {
    'User-Agent': USER_AGENT
  },
  // transformResponse: (data, headers) => {
  //   console.log(headers);
  //   return data;
  // },
  // transformRequest: (data, headers) => {
  //   console.log(headers);
  // }
});

const TO_CRAWL = [
  'http://subs.com.ru/list.php?c=enganime'
];

const getHtml = (response: AxiosResponse) => response.data;

const filterDownloads = (target: QuerySelector, $: CheerioStatic) => $(target).toArray();


const crawl = async (options: SpiderOptions): Promise<void> => {
  const { targets, selector, callback } = options;

  if (R.isEmpty(targets)) {
    return;
  }

  const [head, ...tail] = targets;

  const axiosResponse = await request.get(head);
  const extractLinks = R.curry(filterDownloads)(selector);

  const getLinks = R.pipe(
    getHtml,
    cheerio.load,
    extractLinks
  );

  const selections = getLinks(axiosResponse);

  // TODO: this maybe could cause problems with later crawlers?
  const cookie = axiosResponse.headers['set-cookie'];
  await callback({ selections, cookie, processFiles: true });

  return crawl({ ...options, targets: tail });
};

export const crawlSubsComRu = () =>
  crawl({ targets: TO_CRAWL, selector: 'a[href$="dl"]', callback: processSubsComRu });
