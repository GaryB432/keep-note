#!/usr/bin/env node
// @ts-check
import { cancel, isCancel, log, select, text } from "@clack/prompts";
import { cac } from "cac";
import { digest } from "./lib/google/keep.mjs";

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
    const nns = await digest(dir);
    const nnt = nns.map((n) =>
      n.title ?? n.textContent
        .concat(" there>")
        .concat(new Date(n.createdTimestampUsec).toISOString()),
    );
    log.message(nnt);
    // for (const note of await digest(dir)) {
    //   // log.message(note);
    // }
    // console.log(
    //   JSON.stringify(
    //     m.map((q) => ({ f: q.title })),
    //     undefined,
    //     6,
    //   ),
    // );

    // const nameInput = name ?? (await text({ message: "What is your name?" }));
    // if (isCancel(nameInput)) {
    //   cancel("Cancelled.");
    //   process.exit(0);
    // }

    log.success(`${dir} made it`);
  });

cli.parse();

const m = [
  {
    color: "DEFAULT",
    isTrashed: false,
    isPinned: false,
    isArchived: false,
    textContent: "Open cell ID",
    title: "",
    userEditedTimestampUsec: 1763754124984000,
    createdTimestampUsec: 1763754124984000,
    textContentHtml: `<p dir="ltr" style="line-height:1.38;margin-top:0.0pt;margin-bottom:0.0pt;"><span style="font-size:7.2pt;font-family:'Google Sans';color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Open cell ID</span></p>`,
  },
  {
    color: "DEFAULT",
    isTrashed: false,
    isPinned: false,
    isArchived: true,
    textContent:
      "Steve Gibson was talking about the reporters who left Russia and moved to Europe because they were not allowed to report you know honestly or quote on quote but was is it always bad the journalists The forbidden from reporting certain destructive or degenerate things\n" +
      "\n" +
      "there is much to think about here\n" +
      "\n" +
      "thanks for your thoughts gar",
    title: "",
    userEditedTimestampUsec: 1764095324187000,
    createdTimestampUsec: 1763666278014000,
    textContentHtml: `<p dir="ltr" style="line-height:1.38;margin-top:0.0pt;margin-bottom:0.0pt;"><span style="font-size:7.2pt;font-family:'Google Sans';color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Steve Gibson was talking about the reporters who left Russia and moved to Europe because they were not allowed to report you know honestly or quote on quote but was is it always bad the journalists The forbidden from reporting certain destructive or degenerate things</span></p><br /><p dir="ltr" style="line-height:1.38;margin-top:0.0pt;margin-bottom:0.0pt;"><span style="font-size:7.2pt;font-family:'Google Sans';color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">there is much to think about here</span></p><br /><p dir="ltr" style="line-height:1.38;margin-top:0.0pt;margin-bottom:0.0pt;"><span style="font-size:7.2pt;font-family:'Google Sans';color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">thanks for your thoughts gar</span></p>`,
  },
];
