import { useNavigate } from "react-router-dom";
import BaseButton from "../components/Button/BaseButton";
import Write from "../components/Icons/Write";
import { useEffect, useRef, useState } from "react";
import ChevronIcon from "../components/Icons/ChevronIcon";

import entertainments from "../../public/categoryImg/entertainments.svg";
import game from "../../public/categoryImg/game.svg";
import hobby from "../../public/categoryImg/hobby.svg";
import hobbyImg from "../../public/categoryImg/sports.svg";
import digital from "../../public/categoryImg/digital.svg";
import transportation from "../../public/categoryImg/transportation.svg";
import food from "../../public/categoryImg/food.svg";
import fashion from "../../public/categoryImg/fashion.svg";
import travel from "../../public/categoryImg/travel.svg";
import health from "../../public/categoryImg/health.svg";
import academic from "../../public/categoryImg/academic.svg";
import job from "../../public/categoryImg/job.svg";
import finance from "../../public/categoryImg/finance.svg";
import success from "../../public/categoryImg/success.svg";
import life from "../../public/categoryImg/life.svg";
import shopping from "../../public/categoryImg/shopping.svg";
import media from "../../public/categoryImg/media.svg";
import etc from "../../public/categoryImg/etc.svg";

const categoryData = [
  { id: 0, img: entertainments, text: "연예" },
  { id: 1, img: game, text: "게임" },
  { id: 2, img: hobby, text: "취미" },
  { id: 3, img: hobbyImg, text: "스포츠" },
  { id: 4, img: digital, text: "디지털/IT" },
  { id: 5, img: transportation, text: "교통/운송" },
  { id: 6, img: food, text: "음식" },
  { id: 7, img: fashion, text: "패션" },
  { id: 8, img: travel, text: "여행/풍경" },
  { id: 9, img: health, text: "건강/심리" },
  { id: 10, img: academic, text: "학술/교육" },
  { id: 11, img: job, text: "직업" },
  { id: 12, img: finance, text: "금융/재테크" },
  { id: 13, img: success, text: "성공/계발" },
  { id: 14, img: life, text: "생활/지역" },
  { id: 15, img: shopping, text: "쇼핑/장터" },
  { id: 16, img: media, text: "미디어/이슈" },
  { id: 17, img: etc, text: "기타" },
];

const MainPage = () => {
  const navigate = useNavigate();
  const baseDivRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [baseDivRect, setBaseDivRect] = useState(new DOMRect());
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    if (divRef.current) {
      setScrollPosition(divRef.current.scrollLeft);
    }
  };

  const handleLeft = () => {
    if (divRef.current) {
      divRef.current.scrollTo({
        left: divRef.current.scrollLeft - 128,
        behavior: "smooth",
      });
    }
  };

  const handleRight = () => {
    if (divRef.current) {
      divRef.current.scrollTo({
        left: divRef.current.scrollLeft + 128,
        behavior: "smooth",
      });
    }
  };

  const calculateBaseDivRect = () => {
    if (!baseDivRef.current) return;
    setBaseDivRect(baseDivRef.current.getBoundingClientRect());
  };

  const isAtEnd = () => {
    if (!divRef.current) return false;
    const scrollEnd = divRef.current.scrollWidth - divRef.current.clientWidth;
    return scrollPosition === scrollEnd;
  };

  const isAtStart = () => {
    return scrollPosition === 0;
  };

  useEffect(() => {
    calculateBaseDivRect();

    const handleResize = () => {
      calculateBaseDivRect();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="bg-slate-50 h-screen">
      <section className="flex items-end flex-wrap pt-20 pb-20 px-8 md:px-16 lg:px-24 xl:px-32">
        <div ref={baseDivRef}>
          <h1 className="text-5xl text-slate-800 leading-tight pr-8">
            <strong className="text-violet-800">블라블라 게시판은</strong>
            <br /> 누구나 만들 수 있는 게시판입니다.
          </h1>
        </div>
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
      <div className="relative group">
        <div
          ref={divRef}
          onScroll={handleScroll}
          className="relative h-[144px] overflow-scroll scrollbar-hide flex items-center"
        >
          <div
            className="flex gap-2 overflow-x-visible absolute"
            style={{
              left: `${baseDivRect.left}px`,
            }}
          >
            {categoryData.map((item) => (
              <button
                key={item.id}
                className="w-[120px] text-center shrink-0 relative"
              >
                <img
                  src={item.img}
                  alt={`Item ${item.id}`}
                  className="w-[120px] h-[120px] object-cover"
                />
                <p>{item.text}</p>
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleLeft}
          className={`${
            isAtStart() && "hidden"
          } bg-white rounded-full absolute left-8 top-[60px] transform opacity-0 group-hover:opacity-100 duration-300 ease-in-out bg-opacity-75 backdrop-blur-sm`}
        >
          <ChevronIcon height="56px" />
        </button>
        <button
          onClick={handleRight}
          className={`${
            isAtEnd() && "hidden"
          } rotate-180 bg-white rounded-full absolute right-8 top-[60px] transform opacity-0 group-hover:opacity-100 duration-300 ease-in-out bg-opacity-75 backdrop-blur-sm`}
        >
          <ChevronIcon height="56px" />
        </button>
      </div>
    </main>
  );
};

export default MainPage;
