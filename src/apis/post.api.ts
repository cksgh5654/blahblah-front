import { baseInstance } from './axios.config';
import { toast } from 'react-toastify';

export const getPostData = async (postId: string) => {
  try {
    const response = await baseInstance.get(`/post/detail/${postId}`);

    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    toast.error('존재하지 않는 게시글입니다.');
    throw err;
  }
};

export const createPost = async (
  url: string,
  title: string,
  content: string,
  type?: 'notification'
) => {
  try {
    const response = await baseInstance.post('/post/create', {
      url,
      title,
      content,
      type,
    });

    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    toast.success(response.data.message);
    return response.data;
  } catch (err) {
    toast.error(`${err}`);
    throw err;
  }
};

export const updatePost = async (
  title: string,
  content: string,
  postId: string
) => {
  try {
    const response = await baseInstance.put(`/post/update/${postId}`, {
      title,
      content,
    });

    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    toast.success(response.data.message);
    return response.data;
  } catch (err) {
    toast.error(`${err}`);
    throw err;
  }
};

export const checkAuthor = async (postId: string) => {
  try {
    const response = await baseInstance.get(`/post/checkuser/${postId}`);

    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    toast.error('해당 게시글의 수정 및 삭제 권한이 없습니다.');
    throw err;
  }
};

export const deletePost = async (postId: string) => {
  if (window.confirm('게시글을 삭제하시겠습니까?')) {
    try {
      const response = await baseInstance.delete(`/post/${postId}`);

      if (response.data.isError) {
        throw new Error(response.data.message);
      }
      toast.success(response.data.message);
      return response.data;
    } catch (err) {
      toast.error(`${err}`);
      throw err;
    }
  } else {
    toast.error('삭제 취소');
    throw new Error('삭제 취소');
  }
};

export const getPostsByUserId = async (userId: string, page: string) => {
  try {
    const response = await baseInstance.get(
      `/post/user/${userId}?page=${page}`
    );
    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
