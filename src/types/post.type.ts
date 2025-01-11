import { Board } from "./board.type";
import { User } from "./user.type";

export type ProfilePost = Omit<Post, "board"> & {
  board: Board;
};

export interface Post {
  board: string;
  creator: User;
  title: string;
  content: string;
  deletedAt: string;
  updatedAt: string;
  createdAt: string;
  _id: string;
}
