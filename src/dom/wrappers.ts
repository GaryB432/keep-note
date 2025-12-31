export function addClickListener(
  element: HTMLElement,
  listener: (ev: MouseEvent) => unknown,
): void {
  element.addEventListener("click", listener);
}
