import { toast } from "react-toastify";
import { baseInstance } from "./axios.config";

export const fetchBoardInCategories = async (
  name: string,
  page: number,
  limit: number
) => {
  try {
    const response = await baseInstance.get(`/board/category/${name}`, {
      params: { page, limit },
    });
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

export const getBoardPosts = async (
  boardId: string,
  page: string,
  limit: string
) => {
  try {
    const response = await baseInstance.get(
      `/board/${boardId}/posts?page=${page}&limit=${limit}`
    );
    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getBoardAndPostsByUrlAndId = async (
  boardUrl: string,
  userId: string | null,
  page: number,
  limit: number
) => {
  try {
    const response = await baseInstance.get(`/board/board-post`, {
      params: { boardUrl, userId, page, limit },
    });
    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBoards = async (page: string) => {
  try {
    const response = await baseInstance.get(`/admin/board?page=${page}`);
    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBoard = async (boardId: string) => {
  try {
    const response = await baseInstance.delete(`/admin/board/${boardId}`);
    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBoard = async (url: string) => {
  try {
    const response = await baseInstance.get(`/board/board/${url}`);

    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    toast.error("존재하지 않는 게시판입니다.");
    throw err;
  }
};

export const getBoardsByHeader = async (boardName: string) => {
  try {
    const response = await baseInstance.get("/board/board-name", {
      params: { boardName },
    });
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
