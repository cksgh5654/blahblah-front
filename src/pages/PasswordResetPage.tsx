import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import {
  requestOtpVerifyForResetPassword,
  requestPasswordResetOtp,
} from "../apis/auth.api";
import { useNavigate } from "react-router-dom";

const PasswordResetPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const handleOtpSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.length) return;
    requestPasswordResetOtp(email) //
      .then(() => navigate("#verify"));
  };

  const handleOtpVerifySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    requestOtpVerifyForResetPassword({ password, otp }) //
      .then(() => navigate("/signin"));
  };
  const status = useMemo(() => window.location.hash, [window.location.hash]);
  if (status === "#verify") {
    return (
      <div>
        <form onSubmit={handleOtpVerifySubmit}>
          <input type="text" readOnly value={email} />
          <input
            type="text"
            value={otp}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setOtp(e.target.value)
            }
          />
          <input
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            value={password}
          />
          <button>비밀번호 재설정 하기</button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <form onSubmit={handleOtpSubmit}>
        <input
          type="email"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          value={email}
        />
        <button>비밀번호 재설정 OTP요청</button>
      </form>
    </div>
  );
};

export default PasswordResetPage;
