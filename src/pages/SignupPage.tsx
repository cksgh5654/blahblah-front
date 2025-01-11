import { useNavigate } from "react-router-dom";
import GoogleOauthButton from "@components/Button/GoogleOauthButton";
import Logo from "@components/Icons/Logo";
import EmailAuthForm, { EmailFormDataType } from "@components/EmailAuthForm";
import { requestSignupOtp } from "@apis/auth.api";

const SignupPage = () => {
  const navigate = useNavigate();
  const handleEmailSignup = async (formData: EmailFormDataType) => {
    requestSignupOtp(formData) //
      .then(() => {
        navigate("/signup/otp/verify");
      });
  };
  return (
    <>
      <div
        className="w-screen flex justify-center items-center"
        style={{ height: "calc(-68.5px + 100vh)" }}
      >
        <div className="w-96 flex flex-col gap-y-4">
          <Logo className="py-16" />
          <EmailAuthForm type="signup" onSubmit={handleEmailSignup} />
          <Seperator />
          <GoogleOauthButton
            onClick={() => (window.location.href = "api/auth/google-entry-url")}
          >
            구글 계정으로 가입하기
          </GoogleOauthButton>
          <button
            className="text-center text-sm font-bold text-gray-500"
            onClick={() => navigate("/signin")}
          >
            로그인 하러가기
          </button>
        </div>
      </div>
    </>
  );
};

export default SignupPage;

const Seperator = () => {
  return (
    <div className="flex items-center">
      <div className="flex-grow border-t border-gray-300"></div>
      <p className="px-4 text-sm text-gray-500">SNS 간편 회원가입</p>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};
