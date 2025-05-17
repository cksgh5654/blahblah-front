import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import PlusIcon from "../components/Icons/PlusIcon";
import Card from "../components/Card/Card";
import {
  fetchBoardInCategories,
  getAllBoardsByCatogory,
} from "../apis/board.api";
import BaseButton from "@components/Button/BaseButton";
import ChevronIcon from "@components/Icons/ChevronIcon";
import { Pagination, Popover, useInfinite } from "blahblah-front-common-ui-kit";
import WriteIcon from "@components/Icons/WriteIcon";
import categoryData from "../const/categoryData";
import CarouselXscroll from "@components/CarouselXscroll";

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

interface Board {
  name: string;
  url: string;
}

const pageSize = 60;
const blockSize = 15;
const limit = 4;

const MainPage = () => {
  const { categoryname } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalBoardCount, setTotalBoardCount] = useState(0);
  const navigate = useNavigate();
  const baseDivRef = useRef<HTMLDivElement>(null);
  const infiniteDivRef = useRef<HTMLDivElement>(null);
  const [baseDivRect, setBaseDivRect] = useState(new DOMRect());
  const [popoverBoardsData, setPopoverBoardsData] = useState<Board[]>([]);
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [currentCategory, setCurrentCategory] = useState({
    name: categoryname || "연예",
    boardCount: 0,
  });
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const isLogin = localStorage.getItem("signinStatus");
  const categoryRef = useRef<HTMLDivElement>(null);

  const handleClickCategory = (name: string) => {
    setPage(0);
    setCardData([]);
    setIsLoading(false);
    setCurrentCategory((prev) => ({ ...prev, name }));
    navigate(`/${name}`);
  };

  const calculateBaseDivRect = () => {
    if (!baseDivRef.current) return;
    setBaseDivRect(baseDivRef.current.getBoundingClientRect());
  };

  useEffect(() => {
    if (page === 0 && cardData.length === 0) {
      const fetchBoards = async () => {
        const boards = await fetchBoardInCategories(
          currentCategory.name,
          0,
          limit
        );
        setCurrentCategory({
          name: currentCategory.name,
          boardCount: boards.totalCount,
        });
        setCardData(boards.data);
      };
      fetchBoards();
    }
  }, [page, cardData.length, currentCategory.name]);

  const trigger = async () => {
    if (isLoading || cardData.length >= totalBoardCount) return;
    if (isLoading) return;
    setIsLoading(true);
    const nextPage = page + 1;
    const newBoards = await fetchBoardInCategories(
      currentCategory.name,
      nextPage,
      limit
    );

    if (cardData.length >= newBoards.totalCount) return;

    setCardData((prevData) => [...prevData, ...newBoards.data]);
    setPage(nextPage);
    setIsLoading(false);
  };

  const { setTargetRef } = useInfinite(trigger, [page]);

  const borderOneGlance = async () => {
    try {
      const data = await getAllBoardsByCatogory(
        currentCategory.name,
        currentPage,
        pageSize
      );
      setPopoverBoardsData(data.boards);
      setTotalBoardCount(data.totalBoardCount);
    } catch (error) {
      console.error("게시글을 가져오는 데 실패했습니다.", error);
    }
  };

  const handlePageChange = async (index: number) => {
    setCurrentPage(index);
  };

  useEffect(() => {
    borderOneGlance();
  }, [currentCategory]);

  useEffect(() => {
    setTargetRef(infiniteDivRef);
  }, []);

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

  useEffect(() => {
    const pageMove = async () => {
      const data = await getAllBoardsByCatogory(
        currentCategory.name,
        currentPage,
        pageSize
      );
      setPopoverBoardsData(data.boards);
      setTotalBoardCount(data.totalBoardCount);
    };
    pageMove();
  }, [currentPage]);

  return (
    <>
      <main className="bg-slate-50 min-h-[calc(100vh-73px)]">
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
              onClick={() => {
                isLogin === "true"
                  ? navigate("/create-board")
                  : navigate("/signin");
              }}
            >
              <WriteIcon height="32px" className="mr-2" />
              게시판 만들기
            </BaseButton>
          </div>
        </section>
        <section className="z-0">
          <CarouselXscroll
            baseRect={baseDivRect}
            pixelMove={window.outerWidth}
            itemListRef={categoryRef}
            className="group"
          >
            <CarouselXscroll.ItemContainer className="h-full">
              <CarouselXscroll.Items className="flex gap-4">
                {categoryData.map((item) => {
                  return (
                    <button
                      onClick={() => handleClickCategory(item.name)}
                      key={item.id}
                      className="w-[120px] text-center relative"
                    >
                      <img
                        src={item.img}
                        alt={`Item ${item.id}`}
                        className="w-[120px] h-[120px] object-cover"
                        onDragStart={(e) => e.preventDefault()}
                      />
                      <p>{item.name}</p>
                    </button>
                  );
                })}
              </CarouselXscroll.Items>
            </CarouselXscroll.ItemContainer>
            <CarouselXscroll.Navigator>
              {(prev, next, leftStyle, rightStyle) => (
                <>
                  <button
                    className="bg-[rgba(255,255,255,0.5)] rounded-full opacity-0 group-hover:opacity-100 hover:cursor-pointer duration-300 ease-in-out b backdrop-blur-sm"
                    style={leftStyle}
                    onClick={prev}
                  >
                    <ChevronIcon height="56px" />
                  </button>
                  <button
                    className="bg-[rgba(255,255,255,0.5)] rounded-full opacity-0 group-hover:opacity-100 duration-300 ease-in-out backdrop-blur-sm"
                    style={rightStyle}
                    onClick={next}
                  >
                    <ChevronIcon height="56px" className="rotate-180" />
                  </button>
                </>
              )}
            </CarouselXscroll.Navigator>
          </CarouselXscroll>
        </section>
        <section className="flex flex-col pt-20 items-start px-4 md:px-16 lg:px-24 xl:px-32">
          <div className="flex w-full justify-between items-center">
            <h2 className=" text-violet-800 text-3xl">
              {currentCategory.name} &#40;{currentCategory.boardCount}&#41;
            </h2>

            <Popover
              className={`${currentCategory.boardCount === 0 && "hidden"}`}
            >
              <Popover.Trigger className="flex items-center text-slate-800 text-lg">
                게시판 한눈에 보기
                <PlusIcon height="24px" />
              </Popover.Trigger>
              <Popover.Content className="flex justify-center w-screen h-96 mt-8 px-4 md:px-16 lg:px-24 xl:px-32">
                <div className="flex flex-col justify-between w-full h-full bg-white border rounded-lg overflow-y-scroll">
                  <div
                    className="grid gap-2 w-full py-4 px-2"
                    style={{
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(164px, 1fr))",
                    }}
                  >
                    {popoverBoardsData.map((board) => (
                      <button
                        key={board.name}
                        onClick={() => navigate(`/board/${board.url}`)}
                        className="text-start text-slate-500 hover:text-slate-800 duration-300"
                      >
                        {board.name}
                      </button>
                    ))}
                  </div>
                  <Pagination
                    total={totalBoardCount}
                    value={currentPage}
                    onPageChange={handlePageChange}
                    className="flex justify-center py-8"
                    blockSize={blockSize}
                    pageSize={pageSize}
                  >
                    <Pagination.Navigator className="flex gap-4">
                      <Pagination.Buttons className="PaginationButtons flex gap-4 font-bold text-slate-300" />
                    </Pagination.Navigator>
                  </Pagination>
                </div>
              </Popover.Content>
            </Popover>
          </div>
          <hr className="border-slate-300 w-full mt-2 mb-8" />
          <div
            className="grid gap-4 w-full pb-20"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(328px, 1fr))",
            }}
          >
            {cardData.map((card) => (
              <Card key={card._id} data={card} />
            ))}
          </div>
          <div ref={infiniteDivRef}></div>
        </section>
      </main>
      <style>
        {`
          .PaginationButtons button:disabled {
            color: #5B21B6;
          }
        `}
      </style>
    </>
  );
};

export default MainPage;
