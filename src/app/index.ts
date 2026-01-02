import { addClickListener, ButtonSet } from "@/app/buttons";
import { findNotes, findToolbar } from "@/keep/parser";
import type { Note } from "@/keep/types";
import { createDocumentFrom, suggestFileNameFor } from "@/markdown/factory";
import { insertMarkdownPanel } from "./panel";
import { styleElement } from "./styles";
import { copyTextToClipboard, saveFileWithPicker } from "./web";

let notes: Note[];

function sequencedIdentifier(sequence: number, _subject: Note) {
  return `knn${sequence.toFixed(0)}`;
}

function markBanner() {
  const banner = document.querySelectorAll("body > div");
  console.log(banner.item(0).tagName, "he been here");
}

function insertMarkdownAnchor(
  context: Element,
  toggleButton: HTMLElement,
  panel: Element,
): Element {
  addClickListener(toggleButton, () => {
    panel.classList.toggle("open");
  });

  const toolbar = findToolbar(context);
  toolbar?.append(toggleButton);

  return toggleButton;
}

function addSaveAffordance(note: Note, sequence: number) {
  if (note.context) {
    const buttonSet = new ButtonSet(
      note,
      sequence,
      ()=> document.createElement("div")
    );
    const panel = insertMarkdownPanel(
      note.context,
      sequence,
      buttonSet,
      async () => {
        const md = createDocumentFrom(note);
        const saved = await saveFileWithPicker(
          md.lines.join("\n"),
          suggestFileNameFor(note),
        );
        console.log("saved", md, saved);
      },
      async () => {
        const md = createDocumentFrom(note);
        const { copied } = await copyTextToClipboard(md.lines.join("\n"));
        console.log("copying", copied);
      },
    );
    insertMarkdownAnchor(note.context, buttonSet.toggleButton, panel);
  }
  return null;
}

export function handleNotesHomePage() {
  console.log("📁 Mounted Keep Note");

  document.head.append(styleElement);

  notes = findNotes(document.documentElement);

  const panelsContainer = document.createElement("div");
  document.body.append(panelsContainer);

  notes.forEach((note, sequence) => {
    if (note.context) {
      note.context.classList.add(
        "keep-note",
        sequencedIdentifier(sequence, note),
      );
      addSaveAffordance(note, sequence);
    }
  });
  markBanner();
}
