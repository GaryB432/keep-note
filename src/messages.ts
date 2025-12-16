import type { Note } from "./keep/parser";

export interface GrabNotesMessage {
  type: "GRAB_NOTES_REQUEST";
  payload: { info: chrome.tabs.OnUpdatedInfo };
}

export interface GrabNotesResponseMessage {
  type: "GRAB_NOTES_SUCCESS";
  payload: { notes: Note[] };
}

export type ExtensionMessage = GrabNotesMessage | GrabNotesResponseMessage;

export function sendExtensionMessage<
  T extends ExtensionMessage,
  R = unknown, // R is the expected response type, default to unknown
>(message: T): Promise<R> {
  // The type cast here is safe because `message` is guaranteed to be
  // one of the types in the ExtensionMessage union.
  return new Promise((resolve) => {
    // eslint-disable-next-line
    chrome.runtime.sendMessage(message as any, (response) => {
      resolve(response as R);
    });
  });
}
