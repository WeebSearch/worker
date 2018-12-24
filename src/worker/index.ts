/* tslint:disable */
import { load } from "dotenv";
load();
import { crawlSubsComRu } from "./crawler/crawl";
import "./ingest/subs";
import "./tools/startup";

import { gatherDownloadedSubs } from "./ingest/file";
import { processSavedFiles } from "./ingest/file_processor";
import * as R from "ramda";
import { liftP } from "./tools/utils";
import '../database/index'
import Anime from "../database/entities/anime"
import { where } from "sequelize";
import { sequelize } from "../database/index";
// import { getAnime } from "./ingest/db";

(async () => {
  await sequelize.drop().then(() => sequelize.sync());
  const x = await gatherDownloadedSubs();
  await processSavedFiles(R.flatten(x).map(a => ({ path: a })));
  // const s = await Anime.findOne({ where: { rawName: "123" }});
  // console.log(s.id);
  const q =1;
  // const x = y => y + 1;
  // liftP(x)(1).then(console.log);
  // const z = 2;
})();
