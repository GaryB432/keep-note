#!/usr/bin/env node
import { intro } from "@clack/prompts";
import { blue } from "ansis";
import { cac } from "cac";

import {
  displayTakeoutInstructions,
  takeoutCommand,
} from "./lib/keep/takeout.ts";
import pkg from "./package.json" with { type: "json" };

const cli = cac("keep-note")
  .option("-d, --dryRun", "Write no changes to disk")
  .option("-i, --interactive", "Show all prompts", { default: true })
  .option("--ci", "CI mode: skip prompts and keep generated attachment names");

cli
  .command(
    "takeout [path]",
    "Create Markdown documents from Google Keep Takeout",
  )
  .option("-o, --outDir [outDir]", "Output Directory for Markdown Content")
  .option("-t, --timestamp", "Use a Nested Timestamp Folder in outDir", {
    default: true,
  })
  .example(
    (bin) =>
      `${bin} takeout ~/downloads/Takeout/Keep --outDir /media/pkb-markdown`,
  )
  .example(
    (bin) =>
      `${bin} takeout ~/jsons --outDir /media/pkb-markdown --no-timestamp`,
  )
  .action(takeoutCommand);

cli.help();
cli.version(pkg.version);

intro(blue(cli.name));

const args = cli.parse(process.argv, { run: false });
if (args.args.length && cli.matchedCommand) {
  cli.runMatchedCommand();
} else {
  displayTakeoutInstructions();
  cli.outputHelp();
}
