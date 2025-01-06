import { baseInstance } from "./axios.config";

export const getMyProfile = async () => {
  try {
    const response = await baseInstance.get(`/user/me`);
    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data.user;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

export const getUserInfo = async (nickname: string) => {
  try {
    const response = await baseInstance.get(
      `/user/profile?nickname=${nickname}`
    );
    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data.user;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
