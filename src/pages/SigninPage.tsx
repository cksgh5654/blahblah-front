const SigninPage = () => {
  const handleGoogleOauth = async () => {
    window.location.href = "api/auth/google-entry-url";
  };
  return (
    <>
      <button onClick={handleGoogleOauth}>구글 계정으로 로그인</button>
    </>
  );
};

export default SigninPage;
