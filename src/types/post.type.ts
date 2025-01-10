import { User } from "./user.type";

export interface Post {
  board: string;
  creator: User;
  title: string;
  content: string;
  deletedAt: string;
  updatedAt: string;
  _id: string;
}
