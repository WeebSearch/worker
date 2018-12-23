import * as fs from "fs";
import * as glob from "glob";
import * as path from "path";
import * as R from "ramda";
import * as unpacker from "unpack-all";
import { promisify } from "util";
import { logger } from "../tools/logging";
import { GENERIC_SUB_REGEX } from "./sub_groups";

const BASE_DOWNLOAD_LOCATION = "downloads";
const { freeze } = Object;

const ARCHIVE_GROUPS = freeze([
  ".rar",
  ".zip"
]);

const unlinkAsync = promisify(fs.unlink);
const globAsync = promisify(glob);

interface UnrarOptions {
  readonly deleteAfter: boolean;
}

export const extractFileName = (pathName: string) => pathName.split(path.sep).pop();


/**
 * Unrars a file, optionally deleting it afterwards
 *
 * @param location - filesystem location
 * @param options - deleteAfter?
 *
 * @returns Promise<string[]> - path of all the extracted files
 */
export const extract = async (
  location: string, options?: UnrarOptions
) => new Promise<string[]>(async (res, rej) => {
  const { deleteAfter } = options || { deleteAfter: false };

  const fileName = extractFileName(location);
  const cleanName = fileName.split(".").shift();
  unpacker.unpack(location, {
    targetDir: BASE_DOWNLOAD_LOCATION,
    forceDirectory: true,
    forceOverwrite: true,
    quiet: true
  }, async (err) => {
    if (err) {
      logger.error(err);
      return rej(err);
    }
    try {
      const baseExtractLocation = path.join('downloads', cleanName);
      const files = await globAsync(baseExtractLocation + "/**/*.ass");

      if (deleteAfter) {
        await unlinkAsync(location);
      }

      return res(files);
    } catch (e) {
      logger.error(e);
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

type AnimeMetadata = [...Array<(string | undefined)>];

export const parseFileName = (name: string): AnimeMetadata => {
  const parsed = extractFileName(name);
  return R.match(GENERIC_SUB_REGEX, parsed).slice(1, 4);
};

export const isArchive = (fileName: string) =>
  ARCHIVE_GROUPS.some(group => fileName.includes(extractFileName(group)));

export const gatherDownloadedSubs = () => globAsync('downloads/**/*.ass');
