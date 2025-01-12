const ErrorPage = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center text-center">
      <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-xl text-gray-700">
          죄송합니다! 요청하신 페이지를 찾을 수 없습니다.
        </p>
        <p className="mt-2 text-gray-500">
          입력한 주소가 잘못되었거나, 페이지가 삭제되었을 수 있습니다.
        </p>
        <a className="mt-6 inline-block px-6 py-2 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition">
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
