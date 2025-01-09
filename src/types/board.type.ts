import { User } from "./user.type";

export interface Board {
  name: string;
  description: string;
  image: string;
  category: string;
  url: string;
  createdAt: string;
  _id: string;
  manager: User;
}
