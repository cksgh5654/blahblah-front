import { FormEvent, useState } from "react";
import { sendOtp } from "../apis/auth.api";
import { useNavigate } from "react-router-dom";
import MainLogo from "../components/Icons/MainLogo";
import BaseInput from "../components/Input/BaseInput";
import BaseButton from "../components/Button/BaseButton";

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
    <div
      className="w-screen flex justify-center items-center"
      style={{ height: "calc(-52px + 100vh)" }}
    >
      <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-y-4">
        <MainLogo />
        <BaseInput
          withLabel="OTP 번호"
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
        />
        <BaseButton>이메일 인증 하기</BaseButton>
      </form>
    </div>
  );
};

export default EmailOtpPage;
