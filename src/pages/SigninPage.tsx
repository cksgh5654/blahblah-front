import { useNavigate } from "react-router-dom";
import { signinWithEmail } from "../apis/auth.api";
import EmailAuthForm, { EmailFormDataType } from "../components/EmailAuthForm";

const SigninPage = () => {
  const navigate = useNavigate();
  const handleEmailSignin = (formData: EmailFormDataType) => {
    signinWithEmail(formData) //
      .then(() => navigate("/"));
  };
  const handleGoogleOauth = async () => {
    window.location.href = "api/auth/google-entry-url";
  };
  return (
    <>
      <EmailAuthForm type="signin" onSubmit={handleEmailSignin} />
      <button onClick={handleGoogleOauth}>구글 계정으로 로그인</button>
    </>
  );
};

export default SigninPage;
