#!/usr/bin/env node
import { takeoutCommand } from "#lib/keep/takeout";
import { intro } from "@clack/prompts";
import { blue } from "ansis";
import { cac } from "cac";

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
  .action(takeoutCommand);

cli.help();
cli.version(pkg.version);

intro(blue(cli.name));

cli.parse();
