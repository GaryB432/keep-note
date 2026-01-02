export type Block = string;
export type Image = {
  title?: string | undefined;
  src: string;
};
export type Anchor = {
  title?: string | undefined;
  href: string;
};
export type Note = {
  context?: Element; //  the div that was `selected` by a `Select note` button. It contains many children
  title?: string | undefined;
  blocks: Block[];
  anchors: Anchor[];
  images: Image[];
};
