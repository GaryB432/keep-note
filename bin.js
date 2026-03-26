#!/usr/bin/env node
// @ts-check
import { cancel, isCancel, log, select, text } from "@clack/prompts";
import { cac } from "cac";
import { digest } from "./lib/keep/reader.js";

const cli = cac("keep-note");


cli
  .option("-v, --verbose", "Output extra information")
  .option("-d, --dryRun", "Make no changes to disk")
  .help();

cli
  .command("greet [name] [timezone]", "Greet the user")
  .action(async (name, timezone, options) => {
    const nameInput = name ?? (await text({ message: "What is your name?" }));
    if (isCancel(nameInput)) {
      cancel("Cancelled.");
      process.exit(0);
    }

    const zones = Intl.supportedValuesOf("timeZone");
    const tz =
      timezone ??
      (await select({
        message: "Select your timezone",
        options: zones
          .filter((z) => z.startsWith("America"))
          .map((z) => ({ value: z, label: z })),
      }));
    if (isCancel(tz)) {
      cancel("Cancelled.");
      process.exit(0);
    }

    const h = parseInt(
      new Date().toLocaleString("en-US", {
        timeZone: String(tz),
        hour: "numeric",
        hour12: false,
      }),
      10,
    );
    const greeting = h < 12 ? "Good morning" : "Good evening";
    log.success(`${greeting}, ${String(nameInput)}!`);
  });

cli
  .command("takeout [dir]", "Created GFM Documents from Google Takeout")
  .action(async (dir, options) => {
    void await digest(dir)
    // const nameInput = name ?? (await text({ message: "What is your name?" }));
    // if (isCancel(nameInput)) {
    //   cancel("Cancelled.");
    //   process.exit(0);
    // }

    log.success(`${dir} made it`);
  });

cli.parse();
