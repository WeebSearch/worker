import * as fs from 'fs';
import * as path from 'path';
import * as R from 'ramda';
import * as unpacker from 'unpack-all';
import { promisify } from "util";
import { GENERIC_SUB_REGEX } from "./sub_groups";

const BASE_DOWNLOAD_LOCATION = 'downloads';

const readDirAsnyc = promisify(fs.readdir);
const unlinkAsync = promisify(fs.unlink);

interface UnrarOptions {
  deleteAfter: boolean;
}


export const extractFileName = (pathName: string) => pathName.split('/').pop();

/**
 * Unrars a file, optionally deleting it afterwards
 *
 * @param location - filesystem location
 * @param options - deleteAfter?
 *
 * @returns Promise<string[]> - path of all the extracted files
 */
export const unrar = async (
  location: string, options: UnrarOptions = { deleteAfter: false }
) => new Promise<string[]>(async (res, rej) => {
  const { deleteAfter } = options;

  const fileName = extractFileName(location);
  const cleanName = fileName.split('.').shift();
  unpacker.unpack(location, {
    targetDir: BASE_DOWNLOAD_LOCATION,
    forceOverwrite: true,
    quiet: true,
  }, async (err) => {
    if (err) {
      return rej(err);
    }
    const downloadLocation = path.join(BASE_DOWNLOAD_LOCATION, cleanName);
    try {
      const files = await readDirAsnyc(downloadLocation);

      const joinedFiles = files.map(file => path.join(downloadLocation, file));

      if (deleteAfter) {
        await unlinkAsync(location);
      }

      return res(joinedFiles);
    } catch (e) {
      console.error(e);
      return rej(e);

    }
  });
});

export const readSub = (file: string) => new Promise<string>((resolve, reject) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      return reject(err);
    }
    return resolve(data.toString());
  });
});

export const parseFileName = R.pipe(
  extractFileName,
  R.match(GENERIC_SUB_REGEX),
  R.slice(1, 4)
);
