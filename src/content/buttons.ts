import { Note } from "@/keep/parser";

export class ButtonSet {
  public readonly saveButton: HTMLElement;
  public readonly copyButton: HTMLElement;
  public readonly archiveButton: HTMLElement;
  public readonly toggleButton: HTMLElement;
  constructor(
    _note: Note,
    _sequence: number,
    saveButton: HTMLElement,
    copyButton: HTMLElement,
    archiveButton: HTMLElement,
    toggleButton: HTMLElement,
  ) {
    this.saveButton = saveButton;
    this.copyButton = copyButton;
    this.archiveButton = archiveButton;
    this.toggleButton = toggleButton;

    this.setup(this.saveButton, "save");
    this.setup(this.copyButton, "copy");
    this.setup(this.archiveButton, "archive");
    this.setup(this.toggleButton, "toggle");
  }
  private setup(button: HTMLElement, label: string) {
    button.role = "button";
    button.ariaLabel = "kn ".concat(label);
    button.className = "kn";
  }
}
