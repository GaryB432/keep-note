export function findArchiveButton(toolbar: Element): Element | null {
  return toolbar.querySelector('[aria-label="Archive"]');
}
export function findToolbar(context: Element): Element | null {
  return context.querySelector('[role="toolbar"]');
}
