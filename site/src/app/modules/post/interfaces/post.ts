import { User } from "../../user";

interface BasePost {
    id: string;
    title: string;
    createdAt: Date;
}
export interface ListPost extends BasePost {
    numberOfComments: Number;
}
export interface Post extends BasePost {
  description: string,
  comments: Comment[],
  user: User,
}
