import { addClickListener } from "@/dom/wrappers";
import { findToolbar } from "@/keep/finders";
import { findNotes, type Note } from "@/keep/parser";
import { createDocumentFrom, suggestFileNameFor } from "@/markdown/factory";
import { ButtonSet } from "./buttons";
import { styleElement } from "./styles";
import { saveFileWithPicker } from "./wicg";
import { insertMarkdownPanel } from "./panel";

let notes: Note[];

let panelsContainer: Element;

const { createElement } = document;

function sequencedIdentifier(sequence: number, _subject: Note) {
  return `knn${sequence.toFixed(0)}`;
}

async function copyTextToClipboard(text: string): Promise<{ copied: boolean }> {
  try {
    await navigator.clipboard.writeText(text);
    return { copied: true };
  } catch {
    return { copied: false };
  }
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
    const saveButton = createElement("div");
    const copyButton = createElement("div");
    const archiveButton = createElement("div");
    const toggleButton = createElement("div");

    const buttonSet = new ButtonSet(
      note,
      sequence,
      saveButton,
      copyButton,
      archiveButton,
      toggleButton,
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

function handleNotesHomePage() {
  console.log("📁 Mounted Keep Note");

  document.head.append(styleElement);

  notes = findNotes(document.documentElement);

  panelsContainer = createElement("div");
  document.body.append(panelsContainer);

  notes.forEach((note, sequence) => {
    if (note.context) {
      note.context.classList.add("keep-note");
      note.context.classList.add(sequencedIdentifier(sequence, note));
      addSaveAffordance(note, sequence);
    }
  });
  markBanner();
}

const observer = new MutationObserver((_, obs) => {
  const iframes = document.querySelectorAll("iframe");
  if (iframes.length === 5) {
    handleNotesHomePage();
    obs.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
