import type { Note } from "./keep/parser";

export enum MessageAction {
  GRAB_NOTES_REQUEST = "GRAB_NOTES_REQUEST",
  GRAB_NOTES_RESPONSE = "GRAB_NOTES_RESPONSE",
}

export interface GrabNotesMessage {
  type: MessageAction.GRAB_NOTES_REQUEST;
  payload: { info: chrome.tabs.OnUpdatedInfo; contextHtmls: string[] };
}

export interface GrabNotesResponseMessage {
  type: MessageAction.GRAB_NOTES_RESPONSE;
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
