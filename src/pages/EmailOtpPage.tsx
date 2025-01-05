import { FormEvent, useState } from "react";
import { sendOtp } from "../apis/auth.api";
import { useNavigate } from "react-router-dom";

const EmailOtpPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp) return;
    sendOtp(otp) //
      .then(() => navigate("/"));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => setOtp(e.target.value)} />
      <button>이메일 인증 하기</button>
    </form>
  );
};

export default EmailOtpPage;
