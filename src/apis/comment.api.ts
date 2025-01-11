import { baseInstance } from "./axios.config";

export const getCommentsByUserId = async (userId: string) => {
  try {
    const response = await baseInstance.get(`/comment/user/${userId}`);
    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
