import { log as frog, isCancel, note, text } from "@clack/prompts";
import { bold, cyan, dim, green, underline, yellow } from "ansis";
import { glob, mkdir, readFile, writeFile } from "node:fs/promises";
import { join, parse } from "node:path";

import { createSingleDocument } from "#lib/app/summarizer";

import type { GlobalOptions, Note } from "./types";

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
};

export async function digest(path: string): Promise<Note[]> {
  const files = await Array.fromAsync(glob(join(path, "*.json")));

  const documents = files
    .map((f) => parse(f))
    .filter((p) => !p.name.endsWith("_"));

  const jsons = await Promise.all(
    documents.map(async (d) => await readFile(join(d.dir, d.base), "utf-8")),
  );

  const allNotes = jsons.map<Note>((d) => JSON.parse(d));

  return allNotes.filter((n) => !n.isTrashed && !n.isArchived);
}

export async function takeoutCommand(
  path: string,
  opttions: Readonly<Partial<TakeoutOptions>>,
): Promise<void> {
  // const forcePrompts = typeof opttions?.interactive === "undefined";
  if (typeof opttions.outDir === "boolean") {
    frog.error("weird args. see help.");
    process.exit(1);
  }

  const interactive = opttions.ci ? false : (opttions.interactive ?? true);

  if (path) {
    const outDir =
      opttions?.outDir ??
      (await resolveOutDir({
        outDir: join(path, "keep-note", new Date().toISOString()),
        ...opttions,
      }));

    if (isCancel(outDir)) {
      return;
    }

    const summaryFilePath = join(outDir, "summary.md");

    const newFolder = await mkdir(outDir, { recursive: true });

    if (newFolder) {
      frog.info(`${outDir} was created`);
    }

    const notes = await digest(path);

    const labelsSummary = Object.entries(countNotesByLabel(notes)).map(
      ([k, v]) => {
        const lhs = cyan(k).padEnd(26, ".");
        const rhs = yellow(v.toString()).padStart(16, ".");
        return `${lhs}${rhs}`;
      },
    );

    const doc = await createSingleDocument(notes, path, outDir, interactive);
    if (opttions.dryRun) {
      frog.warn(`Dry Run. ${yellow(outDir)} not written.`);
    } else {
      await writeFile(summaryFilePath, doc.lines.join("\n"));
      frog.success(`Finished. ${green(summaryFilePath)} written.`);
    }
    // note(
    //   m.lines.join("\n"),
    //   "Markdown",
    // );

    note(
      labelsSummary.join("\n"),
      "Process Summary", // This is the title of the note
    );
  }
}

function countNotesByLabel(notes: Note[]) {
  return notes.reduce<Record<string, number>>((a, note) => {
    if (note.labels) {
      const labelNames = note.labels.map((v) => v.name);
      for (const name of labelNames) {
        a[name] = (a[name] ?? 0) + 1;
      }
    }
    return a;
  }, {});
}

async function resolveOutDir(
  opttions: Pick<TakeoutOptions, "outDir">,
): Promise<string | symbol> {
  return await text({
    initialValue: opttions.outDir,
    message: "Where should the Markdown content be placed?",
    placeholder: "./keep-notes/markdown",
  });
}
