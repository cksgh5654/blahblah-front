import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-violet-800 text-8xl font-bold mb-4">404</div>
      <h1 className="text-3xl font-semibold mb-2 py-8">
        요청하신 페이지가 존재하지 않아요!
      </h1>
      <button
        onClick={handleGoHome}
        className="px-6 py-3 bg-violet-800 text-white font-medium rounded-md shadow-md hover:bg-violet-700 transition"
      >
        홈으로 이동
      </button>
    </div>
  );
};

export default ErrorPage;
