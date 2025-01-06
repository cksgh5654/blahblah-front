import { ChangeEvent, FormEvent, useState } from "react";
import { sendOtp } from "../apis/auth.api";
import { useNavigate } from "react-router-dom";
import BaseInput from "../components/Input/BaseInput";
import BaseButton from "../components/Button/BaseButton";
import { otpValidation } from "../utils/validation";
import Logo from "../components/Icons/Logo";

const EmailOtpPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>("");
  const [isValidForm, setIsValidForm] = useState<boolean>();

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.target.value))) {
      setOtp(e.target.value);
    }
  };

  const handleValidationResult = (result: boolean) => {
    setIsValidForm(result);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp || !isValidForm) return;
    sendOtp(otp) //
      .then(() => navigate("/"));
  };
  return (
    <div
      className="w-screen flex justify-center items-center"
      style={{ height: "calc(-68.5px + 100vh)" }}
    >
      <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-y-4">
        <Logo className="py-16" />
        <BaseInput
          withLabel="OTP 번호"
          onChange={handleChangeInput}
          value={otp}
          maxLength={6}
          validation={otpValidation}
          onValidationResult={handleValidationResult}
        />
        <BaseButton>이메일 인증 하기</BaseButton>
      </form>
    </div>
  );
};

export default EmailOtpPage;
