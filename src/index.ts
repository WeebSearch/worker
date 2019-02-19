/* tslint:disable */
import { load } from "dotenv";
load();
import { crawlSubsComRu } from "./crawler/crawl";
import "./ingest/subs";
import "./tools/startup";

import '../database/index'

(async () => {
  await crawlSubsComRu();
  // const s = await Anime.findOne({ where: { rawName: "123" }});
  // console.log(s.id);
  const q =1;
  // const x = y => y + 1;
  // liftP(x)(1).then(console.log);
  // const z = 2;
})();
