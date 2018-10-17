import axios, { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';
import * as R from "ramda";
import { processSubsComRu } from "../ingest/downloader";
import { RESPECT_ROBOTS_TXT, USER_AGENT } from "./settings";
import { QuerySelector, SpiderOptions } from "./spidey";


const TO_CRAWL = [
  'http://subs.com.ru/list.php?c=enganime'
];

const getHtml = (response: AxiosResponse) => response.data;

const filterDownloads = (targets: QuerySelector[], $: CheerioStatic) => targets.map(
  target => $(target).attr('href')
);

const crawl = async (options: SpiderOptions): Promise<void> => {
  const { targets, selectors, callback } = options;

  if (R.isEmpty(targets)) {
    return;
  }

  const [head, ...tail] = targets;
  const headers = {
    'User-Agent': USER_AGENT
  };

  const axiosResponse = await axios.get(head, { headers });
  const extractLinks = R.curry(filterDownloads)(selectors);

  const getLinks = R.pipe(
    getHtml,
    cheerio.load,
    extractLinks
  );

  const selections = getLinks(axiosResponse);

  await callback({ selections });

  return crawl({ ...options, targets: tail });
};

const crawlSubsComRu = () =>
  crawl({ targets: TO_CRAWL, selectors: ['a[href$="dl"]'], callback: processSubsComRu });
