import { baseInstance } from './axios.config';

export const getCommentData = async (postId: string, content: string) => {
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
