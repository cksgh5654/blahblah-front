import { useNavigate } from "react-router-dom";
import { signinWithEmail } from "../apis/auth.api";
import EmailAuthForm, { EmailFormDataType } from "../components/EmailAuthForm";
import GoogleOauthButton from "../components/Button/GoogleOauthButton";
import { useMemo } from "react";
import BaseButton from "../components/Button/BaseButton";
import Logo from "../components/Icons/Logo";

const SigninPage = () => {
  const navigate = useNavigate();
  const handleEmailSignin = (formData: EmailFormDataType) => {
    signinWithEmail(formData) //
      .then(() => navigate("/"));
  };
  const method = useMemo(() => window.location.hash, [window.location.hash]);
  return (
    <div
      className="w-screen flex justify-center items-center"
      style={{ height: "calc(-52px + 100vh)" }}
    >
      <div className="w-96 flex flex-col gap-y-4">
        <Logo className="py-16" />
        {method === "#email" && (
          <EmailAuthForm type="signin" onSubmit={handleEmailSignin} />
        )}
        <BaseButton onClick={() => navigate("#email")}>
          이메일 계정으로 로그인하기
        </BaseButton>
        <Seperator />
        <GoogleOauthButton
          onClick={() => (window.location.href = "api/auth/google-entry-url")}
        >
          구글 계정으로 로그인하기
        </GoogleOauthButton>
        <button
          className="text-center text-sm font-bold text-gray-500"
          onClick={() => navigate("/signup")}
        >
          회원가입 하기
        </button>
        <button
          className="text-center text-sm font-bold text-gray-500"
          onClick={() => navigate("/signup/otp/verify")}
        >
          비밀번호 재설정 하기
        </button>
      </div>
    </div>
  );
};

export default SigninPage;

const Seperator = () => {
  return (
    <div className="flex items-center">
      <div className="flex-grow border-t border-gray-300"></div>
      <p className="px-4 text-sm text-gray-500">SNS 간편 로그인</p>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};
