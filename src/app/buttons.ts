import { type Note } from "@/keep/types";

export class ButtonSet {
  public readonly saveButton: HTMLElement;
  public readonly copyButton: HTMLElement;
  public readonly archiveButton: HTMLElement;
  public readonly toggleButton: HTMLElement;
  constructor(_note: Note, _sequence: number, createDiv: () => HTMLDivElement) {
    this.saveButton = createDiv();
    this.copyButton = createDiv();
    this.archiveButton = createDiv();
    this.toggleButton = createDiv();

    this.setup(this.saveButton, "file-save");
    this.setup(this.copyButton, "file-copy");
    this.setup(this.archiveButton, "done-outline");
    this.setup(this.toggleButton, "markdown-copy");
  }
  private setup(button: HTMLElement, label: string) {
    button.role = "button";
    button.ariaLabel = "kn ".concat(label);
    button.className = "kn";
  }
}

export function addClickListener(
  element: HTMLElement,
  listener: (ev: MouseEvent) => unknown,
): void {
  element.addEventListener("click", listener);
}
