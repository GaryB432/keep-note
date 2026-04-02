export type ΘBlock = string;
export type ΘImage = {
  src: string;
  title?: string | undefined;
};
export type ΘAnchor = {
  href: string;
  title?: string | undefined;
};
export type ΘNote = {
  anchors: ΘAnchor[];
  blocks: ΘBlock[];
  context?: Element; //  the div that was `selected` by a `Select note` button. It contains many children
  images: ΘImage[];
  title?: string | undefined;
};
