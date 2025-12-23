import { findNotes, type Note } from "@/keep/parser";
import { ExtensionMessage, MessageAction } from "@/messages";

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
      console.log(id);
      // const md = createDocumentFrom(note);
      // const btn = document.createElement("button");
      // btn.id = id;
      // btn.className = className;
      // btn.innerText = "📁";
      // note.context.insertAdjacentElement("beforeend", btn);
      // btn.addEventListener(
      //   "click",
      //   (pointerEvent) => {
      //     saveFileWithPicker(md.lines.join("\n"), suggestFileNameFor(note));
      //     pointerEvent.stopPropagation();
      //   },
      //   { once: true },
      // );

      // console.log(note.context.tagName, b.id, note.context);
    }
  });
  //   noteList.notes = notes;
  console.log(notes.length);
}

// onMount(() => {
//   console.log("📁 Mounted Keep Note");

// });

// chrome.runtime.onMessage.addListener(
//   (message: ExtensionMessage, _sender, _sendResponse) => {
//     if (message.type === "GRAB_NOTES_REQUEST") {
//       console.log("🔥 Tab Updated");
//       find_notes_etc_on_reload();
//       markAsProcessed(notes, document.querySelector('[role="banner"]'));
//       // setTimeout(() => {
//       //   reload();
//       // }, 100);

//       // sendResponse({ status: "message_received" }); // Optional: send a response back
//       return false;
//     }
//   },
// );

// import { MessageAction, ExtensionMessage } from './types';

chrome.runtime.onMessage.addListener(
  (
    message: ExtensionMessage,
    sender,
    sendResponse: (response: { success: boolean }) => void,
  ) => {
    console.log(message.type);
    if (message.type === MessageAction.GRAB_NOTES_RESPONSE) {
      const { notes } = message.payload;

      // Process prices (e.g., find elements and update text)
      // console.log(`Updating ${Object.keys(prices).length} prices in ${currency}`);
      console.log(notes);

      document.head.appendChild(styleElement);

      // Return false for synchronous success in 2025
      sendResponse({ success: true });
      return false;
    }
  },
);

const observer = new MutationObserver((_, obs) => {
  const iframes = document.querySelectorAll("iframe");
  const ps = [...iframes].map((f) => f.src.slice(-40));
  console.log(ps);

  if (iframes.length === 5) {
    // find_notes_etc_on_reload();
    reload();
    // processBanner(notes, document.querySelector('[role="banner"]'));
    obs.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// window.requestIdleCallback(() => {
//   // console.log("Hydration likely complete, main thread is idle.");
//   setTimeout(() => {
//     find_notes_etc_on_reload();
//   }, 200);
//   console.log("content ok");
// });

const styleElement = document.createElement("style");
styleElement.textContent = `.save-and-archive {
  background-color: #ff4d4d;
  box-shadow: 0 0 0 0 rgba(255, 77, 77, 0.7);
  animation: pulse-glow 2s infinite cubic-bezier(0.66, 0, 0, 1);
  transition: all 0.3s ease-in-out;
}

.pulsing-button:hover {
  background-color: #e60000;
}

@keyframes pulse-glow {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 77, 77, 0.7);
  }
  70% {
    transform: scale(1);
    /* Expands the shadow and fades its opacity */
    box-shadow: 0 0 0 20px rgba(255, 77, 77, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 77, 77, 0);
  }
}
`;
