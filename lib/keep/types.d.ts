export type GlobalOptions = {
  dryRun: boolean;
  interactive: boolean;
};

export type Note = {
  annotations?: Annotation[];
  attachments?: Attachment[];
  color: string;
  createdTimestampUsec: number;
  isArchived: boolean;
  isPinned?: boolean;
  isTrashed: boolean;
  labels?: Label[];
  listContent?: ListItem[];
  tasks?: Task[];
  textContent: string;
  textContentHtml?: string;
  title: string;
  userEditedTimestampUsec: number;
};

type Annotation = {
  description: string;
  email?: string;
  id?: number;
  source: "WEBLINK";
  title: string;
  url: string;
};
type Attachment = { filePath: string; mimetype: string };
type Label = { name: string };
type ListItem = { isChecked?: boolean; text: string; textHtml: string };

type Task = { id: string };
