import { getAllBoardsByName } from "@apis/board.api";
import Card from "@components/Card/Card";
import PlusIcon from "@components/Icons/PlusIcon";
import { Pagination, Popover, useInfinite } from "blahblah-front-common-ui-kit";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

const SearchPage = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalBoardCount, setTotalBoardCount] = useState(0);
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [popoverBoardsData, setPopoverBoardsData] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const infiniteDivRef = useRef<HTMLDivElement>(null);
  const { boardname } = useParams();
  const [page, setPage] = useState(0);

  const handlePageChange = async (index: number) => {
    setCurrentPage(index);
  };

  useEffect(() => {
    if (!boardname) return;

    setCardData([]);
    setPage(0);

    const fetchBoards = async () => {
      try {
        const boards = await getAllBoardsByName(boardname, 0, limit);
        setCardData(boards.data);
      } catch (error) {
        console.error("게시글을 가져오는 데 실패했습니다.", error);
      }
    };

    fetchBoards();
  }, [boardname]);

  const trigger = async () => {
    if (isLoading || cardData.length >= totalBoardCount) return;
    if (isLoading) return;
    if (!boardname) return;
    setIsLoading(true);

    const nextPage = page + 1;
    const newBoards = await getAllBoardsByName(boardname, nextPage, limit);

    if (cardData.length >= newBoards.totalCount) return;

    setCardData((prevData) => [...prevData, ...newBoards.data]);
    setPage(nextPage);
    setIsLoading(false);
  };

  const { setTargetRef } = useInfinite(trigger, [page]);

  const borderOneGlance = async () => {
    if (!boardname) return;
    try {
      const boards = await getAllBoardsByName(boardname, currentPage, pageSize);
      setPopoverBoardsData(boards.data);
      setTotalBoardCount(boards.totalCount);
    } catch (error) {
      console.error("게시글을 가져오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    borderOneGlance();
  }, [boardname]);

  useEffect(() => {
    setTargetRef(infiniteDivRef);
  }, []);

  useEffect(() => {
    if (!boardname) return;
    const pageMove = async () => {
      const boards = await getAllBoardsByName(boardname, currentPage, pageSize);
      setPopoverBoardsData(boards.data);
      setTotalBoardCount(boards.totalCount);
    };
    pageMove();
  }, [currentPage]);

  return (
    <>
      <main className="flex flex-col min-h-[calc(100vh-73px)] pt-20 items-start px-4 md:px-16 lg:px-24 xl:px-32 bg-slate-50">
        <div className="flex w-full justify-between">
          <h2 className=" text-violet-800 text-3xl">
            검색결과 &#40;{totalBoardCount}&#41;
          </h2>

          <Popover className={`${totalBoardCount === 0 && "hidden"}`}>
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
export default SearchPage;
