import { baseInstance } from "./axios.config";

export const fetchBoardInCategories = async (name: string) => {
  try {
    const response = await baseInstance.get(`/board/category/${name}`);

    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

export const getBoardBySigninUserId = async () => {
  try {
    const response = await baseInstance.get(`/board/managerId`);
    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data.board;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

export const getBoardById = async (boardId: string) => {
  try {
    const response = await baseInstance.get(`/board/boardId/${boardId}`);
    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data.board;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

export const getBoardPosts = async (boardId: string) => {
  try {
    const response = await baseInstance.get(`/board/${boardId}/posts`);
    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data.posts;
  } catch (error) {
    throw error;
  }
};
