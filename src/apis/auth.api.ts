import { EmailFormDataType } from "../components/EmailAuthForm";
import { baseInstance } from "./axios.config";

export const requestSignupOtp = async (data: EmailFormDataType) => {
  try {
    const response = await baseInstance.post("/auth/signup/otp", data);
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

export const sendOtp = async (otp: string) => {
  try {
    const response = await baseInstance.post("/auth/signup/otp/verify", {
      otp,
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

export const signinWithEmail = async (data: EmailFormDataType) => {
  try {
    const response = await baseInstance.post("/auth/signin/email", data);
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
