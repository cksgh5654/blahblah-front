import { useNavigate, useSearchParams } from "react-router-dom";
import EmailAuthForm, { EmailFormDataType } from "../components/EmailAuthForm";
import { requestSignupOtp } from "../apis/auth.api";
import { useMemo } from "react";

const SignupPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleEmailSignup = async (formData: EmailFormDataType) => {
    requestSignupOtp(formData) //
      .then(() => navigate("/signup/otp/verify"));
  };
  const method = useMemo(() => searchParams.get("method"), [searchParams]);
  return (
    <>
      {method === "email" && (
        <EmailAuthForm type="signup" onSubmit={handleEmailSignup} />
      )}
      {method === null && (
        <>
          <button onClick={() => setSearchParams("method=email")}>
            이메일 계정으로 가입
          </button>
          <button
            onClick={() => (window.location.href = "api/auth/google-entry-url")}
          >
            구글 계정으로 가입
          </button>
        </>
      )}
    </>
  );
};

export default SignupPage;
