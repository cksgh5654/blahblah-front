import { useNavigate } from "react-router-dom";
import BaseButton from "../components/Button/BaseButton";
import Write from "../components/Icons/Write";
import { useEffect, useRef, useState } from "react";
import ChevronIcon from "../components/Icons/ChevronIcon";

import entertainments from "../categoryImg/entertainments.svg";
import game from "../categoryImg/game.svg";
import hobby from "../categoryImg/hobby.svg";
import hobbyImg from "../categoryImg/sports.svg";
import digital from "../categoryImg/digital.svg";
import transportation from "../categoryImg/transportation.svg";
import food from "../categoryImg/food.svg";
import fashion from "../categoryImg/fashion.svg";
import travel from "../categoryImg/travel.svg";
import health from "../categoryImg/health.svg";
import academic from "../categoryImg/academic.svg";
import job from "../categoryImg/job.svg";
import finance from "../categoryImg/finance.svg";
import success from "../categoryImg/success.svg";
import life from "../categoryImg/life.svg";
import shopping from "../categoryImg/shopping.svg";
import media from "../categoryImg/media.svg";
import etc from "../categoryImg/etc.svg";
import PlusIcon from "../components/Icons/PlusIcon";
import Card from "../components/Card/Card";
import { fetchBoardInCategories } from "../apis/board.api";

const categoryData = [
  { id: 0, img: entertainments, name: "연예" },
  { id: 1, img: game, name: "게임" },
  { id: 2, img: hobby, name: "취미" },
  { id: 3, img: hobbyImg, name: "스포츠" },
  { id: 4, img: digital, name: "디지털/IT" },
  { id: 5, img: transportation, name: "교통/운송" },
  { id: 6, img: food, name: "음식" },
  { id: 7, img: fashion, name: "패션" },
  { id: 8, img: travel, name: "여행/풍경" },
  { id: 9, img: health, name: "건강/심리" },
  { id: 10, img: academic, name: "학술/교육" },
  { id: 11, img: job, name: "직업" },
  { id: 12, img: finance, name: "금융/재테크" },
  { id: 13, img: success, name: "성공/계발" },
  { id: 14, img: life, name: "생활/지역" },
  { id: 15, img: shopping, name: "쇼핑/장터" },
  { id: 16, img: media, name: "미디어/이슈" },
  { id: 17, img: etc, name: "기타" },
];

interface Manager {
  email: string;
  nickname: string;
  _id: string;
}

interface CardData {
  category: string;
  createdAt: string;
  deleteAt: string | null;
  description: string;
  image: string;
  manager: Manager;
  memberCount: number;
  name: string;
  postCount: number;
  updatedAt: string;
  url: string;
  _id: string;
  __v: number;
}

const MainPage = () => {
  const navigate = useNavigate();
  const baseDivRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [baseDivRect, setBaseDivRect] = useState(new DOMRect());
  const [scrollPosition, setScrollPosition] = useState(0);

  const [cardData, setCardData] = useState<CardData[]>([]);
  const [currentCategory, setCurrentCategory] = useState({
    name: "연예",
    boardCount: 0,
  });

  const handleClickCategory = async (name: string) => {
    const boards = await fetchBoardInCategories(name);

    setCurrentCategory({
      name,
      boardCount: boards.data.length,
    });
    setCardData(boards.data);
  };

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
    handleClickCategory("연예");
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
    <main className="bg-slate-50">
      <section className="flex items-end flex-wrap pt-20 pb-20 px-4 md:px-16 lg:px-24 xl:px-32">
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
      <section>
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
                  onClick={() => handleClickCategory(item.name)}
                  key={item.id}
                  className="w-[120px] text-center relative"
                >
                  <img
                    src={item.img}
                    alt={`Item ${item.id}`}
                    className="w-[120px] h-[120px] object-cover"
                  />
                  <p>{item.name}</p>
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
      </section>
      <section className="flex flex-col pt-20 items-start px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="flex w-full justify-between">
          <h2 className=" text-violet-800 text-3xl">
            {currentCategory.name} &#40;{currentCategory.boardCount}&#41;
          </h2>
          <button className="flex items-center text-slate-800 text-lg">
            게시판 한눈에 보기
            <PlusIcon height="24px" />
          </button>
        </div>
        <hr className="border-slate-300 w-full mt-2 mb-8" />
        <div
          className="grid gap-4 w-full pb-20"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(328px, 1fr))",
          }}
        >
          {cardData.map((card) => (
            <Card key={card._id} data={card} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default MainPage;
