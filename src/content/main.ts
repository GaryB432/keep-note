import { findNotes, type Note } from "@/keep/parser";
import { createDocumentFrom } from "@/markdown/factory";
import { ExtensionMessage } from "@/messages";
import { saveFileWithPicker } from "./wicg";

let notes: Note[];
 
function reload() {
  const { documentElement: contentDocument } = document;

  // addStyles();
  notes = findNotes(contentDocument);

  notes.forEach((note, i) => {
    const id = `knn${i.toFixed(0)}`;
    const className = "keep-note-button-ftw";
    if (
      note.context &&
      note.context.getElementsByClassName(className).length === 0
    ) {
      const md = createDocumentFrom(note);
      const btn = document.createElement("button");
      btn.id = id;
      btn.className = className;
      btn.innerText = "📁";
      note.context.insertAdjacentElement("beforeend", btn);
      btn.addEventListener(
        "click",
        (pointerEvent) => {
          console.log(note.title, "🚨");
          saveFileWithPicker(md.lines.join("\n"));
          pointerEvent.stopPropagation();
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
