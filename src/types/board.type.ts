import { User } from "./user.type";

export interface Board {
  name: string;
  description: string;
  image: string;
  category: string;
  url: string;
  createdAt: string;
  memberCount: number;
  _id: string;
  manager: User;
  approvalStatus: "대기" | "승인";
}
