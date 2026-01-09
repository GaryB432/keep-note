export type Block = string;
export type Image = {
  src: string;
  title?: string | undefined;
};
export type Anchor = {
  href: string;
  title?: string | undefined;
};
export type Note = {
  anchors: Anchor[];
  blocks: Block[];
  context?: Element; //  the div that was `selected` by a `Select note` button. It contains many children
  images: Image[];
  title?: string | undefined;
};
