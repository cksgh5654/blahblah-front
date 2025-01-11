import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@components/Icons/Logo";
import BaseInput from "@components/Input/BaseInput";
import BaseButton from "@components/Button/BaseButton";
import {
  requestOtpVerifyForResetPassword,
  requestPasswordResetOtp,
} from "@apis/auth.api";
import {
  EmailValidation,
  otpValidation,
  PasswordValidation,
} from "@utils/validation";

const PasswordResetPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isValidForm, setIsValidForm] = useState<boolean>();

  const handleOtpSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.length || !isValidForm) return;
    requestPasswordResetOtp(email) //
      .then(() => navigate("#verify"));
  };

  const handleOtpVerifySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp || !password || !isValidForm) return;
    requestOtpVerifyForResetPassword({ password, otp }) //
      .then(() => navigate("/signin"));
  };

  const handleValidationResult = (result: boolean) => {
    setIsValidForm(result);
  };
  const status = useMemo(() => window.location.hash, [window.location.hash]);

  return (
    <div
      className="w-screen flex justify-center items-center"
      style={{ height: "calc(-68.5px + 100vh)" }}
    >
      <div className="w-96">
        <Logo className="py-16" />
        {status === "" && (
          <form onSubmit={handleOtpSubmit} className="flex flex-col gap-y-4">
            <BaseInput
              type="email"
              withLabel="이메일"
              placeholder="이메일을 입력해주세요."
              validation={EmailValidation}
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              onValidationResult={handleValidationResult}
            />
            <BaseButton>비밀번호 재설정 OTP요청</BaseButton>
          </form>
        )}
        {status === "#verify" && (
          <form
            onSubmit={handleOtpVerifySubmit}
            className="flex flex-col gap-y-4"
          >
            <BaseInput
              withLabel="요청 이메일"
              type="text"
              readOnly
              value={email}
              className="text-center font-semibold border-none"
            />
            <BaseInput
              type="text"
              value={otp}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setOtp(e.target.value)
              }
              withLabel="otp 번호"
              validation={otpValidation}
              onValidationResult={handleValidationResult}
            />
            <BaseInput
              type="password"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              value={password}
              withLabel="새로운 비밀번호"
              validation={PasswordValidation}
              onValidationResult={handleValidationResult}
            />
            <BaseButton>비밀번호 재설정 하기</BaseButton>
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordResetPage;
