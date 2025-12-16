import type { ExtensionMessage } from "./messages";

function sayTabUpdating(tabId: number, tab: chrome.tabs.Tab) {
  console.log("🚀 updating", tabId, tab.title, tab.active, tab.index);
}

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) {
    throw new Error("no url so nm");
  }

  switch (tab.status) {
    case "complete": {
      sayTabUpdating(tabId, tab);
      chrome.tabs
        .sendMessage<ExtensionMessage>(tabId, {
          type: "GRAB_NOTES_REQUEST",
          payload: { info },
        })
        .catch((r) => {
          if (chrome.runtime.lastError) {
            console.warn(chrome.runtime.lastError.message);
          }
          console.log(r);
        });
      break;
    }
    case "loading":
    case "unloaded": {
      break;
    }
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  console.log("✅ ready for duty");
});
