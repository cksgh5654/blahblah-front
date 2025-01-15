import { toast } from "react-toastify";
import { EmailFormDataType } from "../components/EmailAuthForm";
import { baseInstance } from "./axios.config";

export const requestSignupOtp = async (data: EmailFormDataType) => {
  const toastId = toast("OTP 이메일 요청 중 입니다.", {
    isLoading: true,
  });
  try {
    const response = await baseInstance.post("/auth/signup/otp", data);
    toast.update(toastId, {
      render: response.data.message,
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      toast.update(toastId, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
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
    toast.success("회원가입에 성공 하였습니다.");
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      toast.error("OTP 인증에 실패하였습니다.");
      throw error;
    }
  }
};

export const signinWithEmail = async (data: EmailFormDataType) => {
  try {
    const response = await baseInstance.post("/auth/signin/email", data);
    return response.data.user;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
      throw error;
    }
  }
};

export const requestPasswordResetOtp = async (email: string) => {
  try {
    const response = await baseInstance.post("/auth/password-reset/otp", {
      email,
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

export const requestOtpVerifyForResetPassword = async (data: {
  otp: string;
  password: string;
}) => {
  try {
    const response = await baseInstance.post(
      "/auth/password-reset/otp/verify",
      data
    );
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

export const signout = async () => {
  try {
    const response = await baseInstance.post("/auth/signout");
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

export const getSigninStatus = async () => {
  try {
    const response = await baseInstance.get("/auth/signin-status");
    if (response.data.isError) {
      throw new Error(response.data.message);
    }
    return response.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
