import { ProfileFormData } from "~types/form.type";
import { baseInstance } from "./axios.config";
import { toast } from "react-toastify";

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

export const getUserInfo = async (email: string) => {
  try {
    const response = await baseInstance.get(`/user/profile?email=${email}`);
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

export const updateMyProfile = async (data: ProfileFormData) => {
  try {
    const response = await baseInstance.put(`/user/me`, data);
    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    toast.success("프로필 업데이트를 완료 하였습니다.");
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      toast.error("프로필 업데이트 실패하였습니다.");
      throw error;
    }
  }
};

export const getUsers = async (page: string) => {
  try {
    const response = await baseInstance.get(`/admin/users?page=${page}`);
    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await baseInstance.delete(`/admin/users/${userId}`);
    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response;
  } catch (error) {
    throw error;
  }
};
