import { SavedFile } from "../typings/ass-parser";
import { extract, isArchive } from "./file";



/**
 * Processing of the files after they are downloaded and sorted by the
 * downloader
 * @param files
 */
export const processSavedFiles = async (files: SavedFile[]): Promise<void> => {
  const extractionsPromise = files.map(async file => {
    const [url, path] = file;
    if (isArchive(path)) {
      const paths = await extract(path);
      return [url, paths];
    }
    return [url, [path]];
  });

  const extractedFiles = await Promise.all(extractionsPromise);



  return;
};
