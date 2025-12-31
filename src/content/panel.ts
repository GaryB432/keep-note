import { addClickListener } from "@/dom/wrappers";
import { findArchiveButton } from "@/keep/finders";
import { ButtonSet } from "./buttons";

export function insertMarkdownPanel(
  context: Element,
  sequence: number,
  buttonSet: ButtonSet,
  saveClickListener: (ev: MouseEvent) => void,
  copyClickListener: (ev: MouseEvent) => void,
): HTMLDivElement {
  const archiveButton = findArchiveButton(context) as HTMLDivElement;

  if (!archiveButton) {
    throw new Error("no archive button");
  }

  addClickListener(buttonSet.archiveButton, (e) => {
    console.log(e);
    archiveButton.click();
    e.stopPropagation();
  });

  const panel = document.createElement("div");
  panel.className = "kn panel";
  addClickListener(panel, (e) => e.stopImmediatePropagation());

  panel.append(
    buttonSet.saveButton,
    buttonSet.copyButton,
    buttonSet.archiveButton,
  );
  addClickListener(buttonSet.saveButton, saveClickListener);
  addClickListener(buttonSet.copyButton, copyClickListener);

  context.insertAdjacentElement("afterend", panel);
  return panel;
}
