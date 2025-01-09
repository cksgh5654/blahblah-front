import { baseInstance } from './axios.config';

type postDataTypes = {
  boardId: string;
  title: string;
  content: string;
};

export const getPostData = async (postId: string) => {
  try {
    const response = await baseInstance.get(`/post/detail/${postId}`);

    if (response.data.isError) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const handlePostCreate = async (
  postData: postDataTypes,
  isVaild: boolean
) => {
  if (!postData.content) {
    alert('내용을 입력해주세요.');
    return;
  }

  if (!isVaild) {
    return;
  }

  try {
    const response = await baseInstance.post('/post/create', postData);

    if (response.data.isError) {
      throw new Error(response.data.message);
    }

    return response.data;

    alert(response.data.message);
  } catch (err) {
    console.error(err);
  }
};

export const handlePostUpdate = async (
  postData: postDataTypes,
  isVaild: boolean,
  postId: string
) => {
  if (!postData.content) {
    alert('내용을 입력해주세요.');
    return;
  }

  if (!isVaild) {
    return;
  }

  try {
    const response = await baseInstance.post(
      `/post/update/${postId}`,
      postData
    );

    if (response.data.isError) {
      throw new Error(response.data.message);
    }

    return response.data;

    alert(response.data.message);
  } catch (err) {
    console.error(err);
  }
};

export const handlePostDelete = async (postId: string) => {
  if (window.confirm('게시글을 삭제하시겠습니까?')) {
    try {
      const response = await baseInstance.delete(`/post/delete/${postId}`);

      if (response.data.isError) {
        throw new Error(response.data.message);
      }

      return response.data;
      alert(response.data.message);
    } catch (err) {
      console.error(err);
    }
  }
};
