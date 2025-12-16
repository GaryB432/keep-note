console.log("[CRXJS] Hello world from content script!");
import { ExtensionMessage } from "~/messages";
import { findNotes, type Note } from "../keep/parser";
import { MarkdownDocument } from "../markdown/document";
// import type { ExtensionMessage } from "@/messages";
// import { noteList } from "@/state/notes.svelte";
// import { onMount } from "svelte";

// import {findNotes} from "../libs/keep/src/parser"

let notes: Note[];

function createDocumentFrom(note: Note): MarkdownDocument {
  const d = new MarkdownDocument();
  d.appendHeading(note.title ?? note.lines[0].slice(0, 75));
  d.appendParagraph(note.lines);
  d.appendList(["coming", "soon"]);

  return d;
}

async function saveFileWithPicker(contents: FileSystemWriteChunkType) {
  console.log(contents);
  try {
    // Show a file picker and get a file handle
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: `keep-inbox-${new Date().toUTCString()}.md`,
      types: [
        { description: "Markdown", accept: { "text/x-markdown": ".md" } },
      ],
    });

    // Create a writable stream
    const writable = await fileHandle.createWritable();

    // Write the contents
    await writable.write(contents);

    // Close the file and write the contents to disk
    await writable.close();
    console.log("File saved successfully!");
  } catch (err) {
    console.error("Error saving file:", err);
  }
}

function reload() {
  const { documentElement: contentDocument } = document;

  // addStyles();
  notes = findNotes(contentDocument);

  notes.forEach((note, i) => {
    const id = `knn${i.toFixed(0)}`;
    const className = "keep-note-button-ftw";
    let existantButtons = note.context.getElementsByClassName(className);
    if (existantButtons.length === 0) {
      const md = createDocumentFrom(note);
      const btn = document.createElement("button");
      btn.id = id;
      btn.className = className;
      btn.innerText = "📁";
      note.context.insertAdjacentElement("beforeend", btn);
      btn.addEventListener(
        "click",
        (ce) => {
          console.log(note.title, "🚨");
          console.log(ce.currentTarget);
          //   const md = createDocumentFrom(note);
          saveFileWithPicker(md.lines.join("\n"));
          ce.stopPropagation();
        },
        { once: true },
      );

      // console.log(note.context.tagName, b.id, note.context);
    }
  });
  //   noteList.notes = notes;
  console.log(notes.length);
}

// onMount(() => {
//   console.log("📁 Mounted Keep Note");

// });

chrome.runtime.onMessage.addListener(
  (message: ExtensionMessage, _sender, _sendResponse) => {
    if (message.type === "GRAB_NOTES_REQUEST") {
      console.log("🔥 Tab Updated");
      reload();

      // Perform actions in the content script, e.g., update UI
      // sendResponse({ status: "message_received" }); // Optional: send a response back
      return false;
    }
  },
);
