import { log as frog, note, text } from "@clack/prompts";
import { bold, cyan, dim, green, underline, yellow } from "ansis";
import { existsSync } from "node:fs";
import { glob, mkdir, readFile, writeFile } from "node:fs/promises";
import { join, parse } from "node:path";

import type { GlobalOptions } from "../app/types.ts";
import type { Note } from "./types.ts";

import { timestampForDir } from "../app/strings.ts";
import {
  createSingleDocument,
  summarizeListOfNotes,
} from "../app/summarizer.ts";

export const displayTakeoutInstructions = () => {
  frog.info(`
${bold.cyan("How to get your Google Keep Takeout file:")}

1. Go to ${underline.blue("https://takeout.google.com")}
2. Click ${yellow('"Deselect all"')} at the top of the list.
3. Scroll down, find ${bold.green("Keep")}, and check its box.
4. Scroll to the bottom and click ${bold.green("Next step")}.
5. Configure the export settings:
   • ${dim("Destination:")} Send download link via email
   • ${dim("Frequency:")} Export once
   • ${dim("File type:")} .tgz
6. Click ${bold.green("Create export")}.
7. Download the archive when the email arrives.
  • It will contain a ${bold.green("Takeout/Keep")} folder
`);
};

export type TakeoutOptions = GlobalOptions & {
  outDir: string;
  timestamp: boolean;
};

export async function digest(path: string): Promise<Partial<Note>[]> {
  const files = await Array.fromAsync(glob(join(path, "*.json")));

  const documents = files
    .map((f) => parse(f))
    .filter((p) => !p.name.endsWith("_"));

  const jsons = await Promise.all(
    documents.map(async (d) => await readFile(join(d.dir, d.base), "utf-8")),
  );

  const allNotes = jsons.map<Partial<Note>>((d) => JSON.parse(d));

  return allNotes.filter((n) => !n.isTrashed && !n.isArchived);
}

export async function takeoutCommand(
  path: string,
  options: Readonly<Partial<TakeoutOptions>>,
): Promise<void> {
  const interactive = options.ci ? false : (options.interactive ?? true);

  if (!existsSync(path)) {
    frog.error(`Path ${path} does not exist`);
    process.exit(1);
  }

  if (path) {
    let maybe_od: string | symbol | undefined = options.outDir;

    if (!maybe_od) {
      maybe_od = await resolveOutDir("clout/notes");
    }

    if (typeof maybe_od === "symbol") {
      return;
    }

    const outDir = options.timestamp
      ? join(maybe_od, timestampForDir(new Date()))
      : maybe_od;

    const summaryFilePath = join(outDir, "summary.md");

    const newFolder = await mkdir(outDir, {
      recursive: true,
    });

    if (newFolder) {
      frog.info(`${outDir} was created`);
    }

    const notes = await digest(path);

    // const labelsSummary = Object.entries(countNotesByLabel(notes)).map(
    //   ([k, v]) => {
    //     const lhs = cyan(k).padEnd(26, ".");
    //     const rhs = yellow(v.toString()).padStart(16, ".");
    //     return `${lhs}${rhs}`;
    //   },
    // );

    note(summarizeListOfNotes(notes), `Summary: ${cyan(path)}`);

    const doc = await createSingleDocument(notes, path, outDir, interactive);
    if (options.dryRun) {
      frog.warn(`Dry Run. ${yellow(outDir)} not written.`);
    } else if (typeof doc === "symbol") {
      frog.info("cancelled");
    } else {
      await writeFile(summaryFilePath, doc.lines.join("\n"));
      frog.success(`Finished. ${green(summaryFilePath)} written.`);
    }
    // note(
    //   m.lines.join("\n"),
    //   "Markdown",
    // );

    // if (labelsSummary.length === 0) {
    //   labelsSummary.push("No labels");
    // }
  }
}

// function _countNotesByLabel(
//   notes: Pick<Note, "labels">[],
// ): Record<string, number> {
//   return notes.reduce<Record<string, number>>((a, note) => {
//     if (note.labels) {
//       const labelNames = note.labels.map((v) => v.name);
//       for (const name of labelNames) {
//         if (name) {
//           a[name] = (a[name] ?? 0) + 1;
//         }
//       }
//     }
//     return a;
//   }, {});
// }

async function resolveOutDir(initialValue: string): Promise<string | symbol> {
  return await text({
    initialValue,
    message: "Where should the Markdown content be placed?",
    placeholder: "./keep-notes/markdown",
  });
}
