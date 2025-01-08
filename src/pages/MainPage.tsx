import { useNavigate } from "react-router-dom";
import BaseButton from "../components/Button/BaseButton";
import Write from "../components/Icons/Write";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <main className="bg-slate-50 h-screen">
      <section className="flex justify-between items-end flex-wrap pt-20 pb-10 px-4 md:px-16 lg:px-24 xl:px-32">
        <h1 className="text-5xl text-slate-800 leading-tight pr-4">
          <strong className="text-violet-800">블라블라 게시판은</strong>
          <br /> 누구나 만들 수 있는 게시판입니다.
        </h1>
        <div>
          <BaseButton
            className="flex items-center justify-center mb-2 mt-4"
            onClick={() => navigate("/create")}
          >
            <Write height="32px" className="mr-2" />
            게시판 만들기
          </BaseButton>
        </div>
      </section>
      <section></section>
    </main>
  );
};

export default MainPage;
