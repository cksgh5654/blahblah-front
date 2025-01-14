export interface ProfileComment {
  _id: string;
  creator: string;
  post: {
    _id: string;
    title: string;
    board: {
      image: string;
    };
  };
  content: string;
  deletedAt: null | string;
  createdAt: string;
  updatedAt: string;
}
