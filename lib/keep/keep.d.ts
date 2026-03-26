export type Note = {
  color: string;
  isTrashed: boolean;
  isArchived: boolean;
  textContent: string;
  title: string;
  userEditedTimestampUsec: number;
  createdTimestampUsec: number;
  textContentHtml: string;
};
