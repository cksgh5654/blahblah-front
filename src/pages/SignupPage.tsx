const SignupPage = () => {
  return (
    <>
      <button
        onClick={() => (window.location.href = "api/auth/google-entry-url")}
      >
        구글 계정으로 가입
      </button>
    </>
  );
};

export default SignupPage;
