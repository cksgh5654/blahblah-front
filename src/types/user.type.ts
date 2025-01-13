export type Profile = Omit<User, "_id">;

export type UserRole = "USER" | "ADMIN";
export interface BoardUser {
  baordId: string;
  user: User;
  joinedStatus: boolean;
}

export interface User {
  email: string;
  nickname: string;
  image: string;
  _id: string;
  createdAt: string;
  role?: UserRole;
}
