import * as fs from "fs";
import * as path from "path";
import * as R from "ramda";
import { Readable } from "stream";
import { request } from "../crawler/crawl";
import { SpiderCallback } from "../crawler/spidey";

const getWriteFile = (name: string) => fs.createWriteStream(
  path.join('downloads', name)
);

const processSingleFile = (inStream: Readable, outStream: fs.WriteStream): Promise<string> => new Promise((res, rej) => {
  inStream.pipe(outStream);
  outStream.on('finish', () => res(outStream.path as string));
  outStream.on('error', rej);
});

const extractFileName = (url: string) => url.split('/').pop();

const downloadUrl = (url: string, cookie) => request.get(url, {
  responseType: 'stream',
  // server doesn't reply without a session
  headers: {
    Cookie: cookie
  }
});

export const processSubsComRu = async ({ selections, cookie, processFiles }: SpiderCallback) => {
  const LINK_PREPEND = 'http://subs.com.ru/';
  const extractUrl = response => response.request.res.responseUrl;

  const links = selections.map(link => LINK_PREPEND + link.attribs.href);
  const test = links.slice(0, 2);

  const promises = test.map(url => downloadUrl(url, cookie));
  const downloads = await Promise.all(promises);

  const requestToStream = R.pipe(
    extractUrl,
    extractFileName,
    getWriteFile
  );

  const writeFiles = downloads.map(requestToStream);
  const streams = R.zipWith(
    (download, file) => processSingleFile(download.data, file),
    downloads,
    writeFiles
  );

  const paths = await Promise.all(streams);

  if (processFiles) {
    // TODO: send data to file handler
  }
  return paths;
};
