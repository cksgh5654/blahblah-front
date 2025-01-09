export const EmailValidation = (email: string) => {
  if (!email.length) {
    return { result: false, message: '이메일을 입력해주세요.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const result = emailRegex.test(email);
  return {
    result,
    message: result ? null : '잘못된 이메일 형식 입니다.',
  };
};

export const PasswordValidation = (password: string) => {
  if (!password.length) {
    return { result: false, message: '패스워드를 입력해주세요.' };
  }
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const result = passwordRegex.test(password);
  return {
    result,
    message: result
      ? null
      : '8자이상, 영문 대소문자와 숫자, 특수문자를 포함해야 합니다.',
  };
};

export const otpValidation = (otp: string) => {
  if (otp.length < 6) {
    return { result: false, message: 'otp 번호는 6자리입니다.' };
  }
  return { result: true, message: null };
};

export const PostTitleValidation = (title: string) => {
  if (!title.length) {
    return { result: false, message: '게시글 제목을 입력해주세요.' };
  }
  return { result: true, message: null };
};
