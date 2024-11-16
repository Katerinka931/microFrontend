export interface Discussion {
  id?: number;
  author?: number;
  advertisement?: number;
  name?: string;
  text?: string;
  comments?: Comment[];
}

export interface Comment {
  id?: number;
  author?: number;
  text?: string;
  discussion_id?: number;
}
