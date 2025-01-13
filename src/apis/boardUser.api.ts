import { baseInstance } from "./axios.config";

export const getBoardUsers = async (
  boardId: string,
  page: string,
  limit: string = "20"
) => {
  try {
    const response = await baseInstance.get(
      `/board/${boardId}/users?page=${page}&limit=${limit}`
    );
    if (response.data.isError) {
      throw new Error(response.data.isError);
    }
    return response.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

export const kickBoardUser = async (boardId: string, boardUserId: string) => {
  try {
    const response = await baseInstance.delete(
      `/board/${boardId}/users/${boardUserId}`
    );
    if (response.data.isError) {
      throw new Error(response.data.isError);
    }
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

export const updateBoardUserJoinedStatus = async (
  status: boolean,
  boardId: string,
  userId: string
) => {
  try {
    const response = await baseInstance.put(
      `/board/${boardId}/users/${userId}`,
      { joinedStatus: status }
    );
    if (response.data.isError) {
      throw new Error(response.data.isError);
    }
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

export const createBoardUser = async (board: string, user: string) => {
  try {
    const response = await baseInstance.post("/board/createBoardUser", {
      board,
      user,
    });
    if (response.data.isError) {
      throw new Error(response.data.isError);
    }
    return response.data.message;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
