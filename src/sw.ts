import { MessageAction, type ExtensionMessage } from "./messages";

// function sayTabUpdating(tabId: number, tab: chrome.tabs.Tab) {
//   console.log("🚀 updating", tabId, tab.title, tab.active, tab.index);
// }

// chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
//   if (!tab.url) {
//     throw new Error("no url so nm");
//   }

//   switch (tab.status) {
//     case "complete": {
//       sayTabUpdating(tabId, tab);
//       chrome.tabs
//         .sendMessage<ExtensionMessage>(tabId, {
//           type: "GRAB_NOTES_REQUEST",
//           payload: { info },
//         })
//         .catch((r) => {
//           if (chrome.runtime.lastError) {
//             console.warn(chrome.runtime.lastError.message);
//           }
//           console.log(r);
//         });
//       break;
//     }
//     case "loading":
//     case "unloaded": {
//       break;
//     }
//   }
// });

// import { MessageAction, ExtensionMessage } from './types';

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // We still use status === 'complete' as a trigger
  if (changeInfo.status === "complete" && tab.url) {
    try {
      console.log("d");
      // 2025 Best Practice: Optional try/catch to handle tabs that don't allow messaging
      const message: ExtensionMessage = {
        type: MessageAction.GRAB_NOTES_RESPONSE,
        payload: {
          // info: changeInfo,
          notes: [],
          // currency: "USD"
        },
      };

      await chrome.tabs.sendMessage(tabId, message);
    } catch {
      console.debug("Message target not ready or restricted page.");
    }
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  console.log("✅ ready for duty");
});
