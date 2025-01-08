export type Profile = Omit<User, "_id">;

export interface User {
  email: string;
  nickname: string;
  image: string;
  _id: string;
  createdAt: string;
}
