import { spawnSync } from "child_process";

const NO_PRISMA_SECRET = `Missing PRISMA_SECRET environment variable:
Set a PRISMA_SECRET in the .env file to make sure 
the worker script can properly interface with the database`;

if (!process.env.PRISMA_SECRET) {
  console.error(NO_PRISMA_SECRET);
  process.exit(0);
}

if (process.platform !== "win32") {
  // We specifically need blocking behavior here
  // const child = spawnSync("bash", ["..src/worker/tools/process.sh"]);
  // const [, stdout] = child.output;
  // if (child.status !== 0) {
  //   console.log('errored')
  //   console.log(stdout);
  //   process.exit(1);
  // }
}
