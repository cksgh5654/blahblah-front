import Write from "../components/Icons/Write";

const MainPage = () => {
  return (
    <main className="bg-slate-50 h-screen">
      <section className="flex justify-between pt-20 pb-16">
        <h1 className="text-5xl text-slate-800">
          <strong className="text-violet-800">블라블라 게시판은</strong>
          <br /> 누구나 만들 수 있는 게시판입니다.
        </h1>
        <button className="bg-violet-800 flex items-center text-white">
          <Write height="32px" />
          게시판 만들기
        </button>
      </section>
    </main>
  );
};

export default MainPage;
