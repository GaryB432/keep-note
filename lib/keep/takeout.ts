import { createSingleDocument } from "#lib/app/summarizer";
import { log as frog, isCancel, note, text } from "@clack/prompts";
import { cyan, green, yellow } from "ansis";
import { glob, readFile, writeFile } from "node:fs/promises";
import { join, parse } from "node:path";

import type { GlobalOptions, Note } from "./types";

export function add(a: number, b: number): number {
  return a + b;
}
export function greet(name: string): string {
  return `takeout says: hello to ${name}`;
}
export const meaning: { life: number } = {
  life: 42,
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

  if (path) {
    const outDir =
      opttions?.outDir ??
      (await resolveOutDir({
        outDir: join(path, "keep-note", new Date().toISOString()),
        ...opttions,
      }));

    if (!isCancel(outDir)) {
      const notes = await digest(path);

      const labelsSummary = Object.entries(countNotesByLabel(notes)).map(
        ([k, v]) => {
          const lhs = cyan(k).padEnd(26, ".");
          const rhs = yellow(v.toString()).padStart(16, ".");
          return `${lhs}${rhs}`;
        },
      );

      const doc = await createSingleDocument(
        notes,
        path,
        outDir,
        opttions.interactive ?? true,
      );
      if (opttions.dryRun) {
        frog.warn(`Dry Run. ${yellow(outDir)} not written.`);
      } else {
        await writeFile(join(outDir, "summary.md"), doc.lines.join("\n"));
        frog.success(`Finished. ${green(outDir)} written.`);
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
