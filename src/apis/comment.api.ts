import { toast } from 'react-toastify';
import { baseInstance } from './axios.config';

export const createComment = async (postId: string, content: string) => {
  try {
    const response = await baseInstance.post('/comment', {
      postId,
      content,
    });

    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    toast.success(response.data.message);
    return response.data;
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
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

export const checkAuthor = async (commentId: string) => {
  try {
    const response = await baseInstance.get(`/comment/checkuser/${commentId}`);

    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    toast.error('해당 댓글의 수정 및 삭제 권한이 없습니다.');
    throw err;
  }
};

export const updateComment = async (commentId: string, content: string) => {
  try {
    const response = await baseInstance.put(`/comment/${commentId}`, {
      content,
    });

    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    toast.success('수정 성공');
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
      toast.success('삭제 성공');
      return response.data;
    } catch (err) {
      console.error(err);
    }
  } else {
    toast.error('삭제 취소');
    throw new Error('삭제 취소');
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
