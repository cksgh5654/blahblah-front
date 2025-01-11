import { ChangeEvent, useState } from "react";
import BaseInput from "./Input/BaseInput";
import BaseButton from "./Button/BaseButton";
import { EmailValidation, PasswordValidation } from "@utils/validation";
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
  const [isValidForm, setIsValidForm] = useState<boolean>();
  const [formData, setFormData] = useState<EmailFormDataType>(
    DEFAULT_EMAIL_FORM_DATA
  );

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleValidationChange = (result: boolean) => {
    setIsValidForm(result);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!isValidForm) return;
        onSubmit(formData);
      }}
      className="flex flex-col gap-y-4"
    >
      <BaseInput
        withLabel="이메일"
        placeholder="이메일을 입력해주세요"
        type="email"
        id="email"
        name="email"
        onChange={handleChangeForm}
        validation={EmailValidation}
        onValidationResult={handleValidationChange}
      />
      <BaseInput
        withLabel="패스워드"
        placeholder="비밀번호를 입력해주세요"
        type="password"
        id="password"
        name="password"
        onChange={handleChangeForm}
        validation={PasswordValidation}
      />
      <BaseButton className="bg-violet-800/70">
        {type === "signin" ? "로그인" : "이메일로 가입하기"}
      </BaseButton>
    </form>
  );
};

export default EmailAuthForm;
