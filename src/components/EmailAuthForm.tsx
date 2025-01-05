import { ChangeEvent, useState } from "react";
const DEFAULT_EMAIL_FORM_DATA = {
  email: "",
  password: "",
};
export type EmailFormDataType = {
  email: string;
  password: string;
};
interface EmailAuthFormProps {
  type: "signin" | "signup";
  onSubmit: (data: EmailFormDataType) => void;
}
const EmailAuthForm = ({ type, onSubmit }: EmailAuthFormProps) => {
  const [formData, setFormData] = useState<EmailFormDataType>(
    DEFAULT_EMAIL_FORM_DATA
  );

  const btnText =
    type === "signin" ? "이메일로 로그인하기" : "이메일로 가입하기";

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <label htmlFor="email">이메일</label>
      <input type="email" id="email" name="email" onChange={handleChangeForm} />
      <label htmlFor="password">패스워드</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={handleChangeForm}
      />
      <button>{btnText}</button>
    </form>
  );
};

export default EmailAuthForm;
