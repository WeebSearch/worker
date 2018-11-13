import { load } from "dotenv";

load();
import "./tools/startup";
// noinspection TsLint
import "./ingest/subs";


// import './resolvers/anime_resolver';

// import './tools/startup';
// unrar("downloads/we.zip").then(console.log);
import { crawlSubsComRu } from "./crawler/crawl";
crawlSubsComRu();
// extract('downloads/Angels_of_Death_TV_2018_Eng.rar').then(console.log)
