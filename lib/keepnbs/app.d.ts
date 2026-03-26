type Annotation = {
  description: string;
  source: "WEBLINK";
  title: string;
  url: string;
};

export type Note = {
  annotations?: Annotation[];
  color: string;
  isTrashed: boolean;
  isArchived: boolean;
  textContent: string;
  title: string;
  userEditedTimestampUsec: number;
  createdTimestampUsec: number;
  textContentHtml: string;
};
