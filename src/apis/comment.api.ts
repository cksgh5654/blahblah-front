import { baseInstance } from './axios.config';

export const createComment = async (postId: string, content: string) => {
  try {
    const response = await baseInstance.post('/comment/create', {
      postId,
      content,
    });

    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getComments = async (postId: string) => {
  try {
    const response = await baseInstance.post('/comment/view', {
      postId,
    });

    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateComment = async (commentId: string, content: string) => {
  try {
    const response = await baseInstance.put(`/comment/update/${commentId}`, {
      content,
    });

    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteComment = async (commentId: string) => {
  if (window.confirm('댓글을 삭제하시겠습니까?')) {
    try {
      const response = await baseInstance.delete(`/comment/${commentId}`);

      if (response.data.isError) {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
};

export const getCommentsByUserId = async (userId: string, page: string) => {
  try {
    const response = await baseInstance.get(
      `/comment/user/${userId}?page=${page}`
    );
    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
