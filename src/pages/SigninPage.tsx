import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import EmailAuthForm, { EmailFormDataType } from "@components/EmailAuthForm";
import Logo from "@components/Icons/Logo";
import BaseButton from "@components/Button/BaseButton";
import GoogleOauthButton from "@components/Button/GoogleOauthButton";
import { useUserContext } from "@context/userContext";
import { signinWithEmail } from "@apis/auth.api";
import { toast } from "react-toastify";
import { baseInstance } from "@apis/axios.config";

const SigninPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();
  const { updateUser } = useUserContext();
  const handleEmailSignin = (formData: EmailFormDataType) => {
    signinWithEmail(formData) //
      .then((user) => {
        updateUser(user);
        localStorage.signinStatus = true;
        navigate("/");
      });
  };
  const method = useMemo(() => window.location.hash, [window.location.hash]);

  useEffect(() => {
    const errorMessage = searchParams.get("errorMessage");
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!code) {
      return;
    }
    baseInstance //
      .get(`/auth/google-oauth-redirect?code=${code}`)
      .then(() => {
        navigate("/", { replace: true });
      });
  }, [code]);
  return (
    <div
      className="w-screen flex justify-center items-center"
      style={{ height: "calc(-68.5px + 100vh)" }}
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
          onClick={() => navigate("/password-reset/otp")}
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
