import { AxiosError } from "axios";
import { useNavigate, useRouteError } from "react-router-dom";

const UnauthorizedErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError() as AxiosError<{ message: string }>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-violet-800 text-8xl font-bold mb-4">401</div>
      <h1 className="text-3xl font-semibold mb-2 py-8">
        {error.response?.data.message}
      </h1>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-violet-800 text-white font-medium rounded-md shadow-md hover:bg-violet-700 transition"
      >
        홈으로 이동
      </button>
    </div>
  );
};

export default UnauthorizedErrorPage;
