#!/usr/bin/env node
import { intro } from "@clack/prompts";
import { blue } from "ansis";
import { cac } from "cac";

import { displayTakeoutInstructions, takeoutCommand } from "#lib/keep/takeout";

import pkg from "./package.json" with { type: "json" };

const cli = cac("keep-note")
  .option("-d, --dryRun", "Write no changes to disk")
  .option("-i, --interactive", "Show All Prompts");

cli
  .command(
    "takeout [path]",
    "Create Markdown documents from Google Keep Takeout",
  )
  .option("-o, --outDir [outDir]", "Output Directory for Markdown Content")
  .example(
    (bin) =>
      `${bin} takeout ~/takeout-latest --outDir /media/pkb-markdown/stage`,
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
