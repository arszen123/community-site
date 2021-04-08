import { ListPost } from "../../post";

export interface User {
    id: string;
    username: string;
}

export interface Profile extends User {
    posts: ListPost[];
}