import { deleteBoard, getBoards } from "@apis/board.api";
import BaseButton from "@components/Button/BaseButton";
import { Pagination } from "blahblah-front-common-ui-kit";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Board } from "~types/board.type";

type PageInfo = {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalPage: number;
  totalBoardCount: number;
};

const BoardList = () => {
  const [board, setBoard] = useState<Board[]>();
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangePage = async (index: number) => {
    setSearchParams({ selectedTab: "BOARD", page: String(index + 1) });
  };

  const handleDeleteBoard = (boardId: string) => {
    deleteBoard(boardId) //
      .then(() => {
        const updatedBoard = board?.filter((board) => board._id !== boardId);
        setBoard(updatedBoard);
      });
  };

  useEffect(() => {
    const selectedTab = searchParams.get("selectedTab") || "BOARD";
    const page = searchParams.get("page") || "1";
    if (selectedTab !== "BOARD") return;
    getBoards(page) //
      .then(({ board, pageInfo }) => {
        setBoard(board);
        setPageInfo(pageInfo);
      });
  }, [searchParams]);

  return (
    <>
      <ul>
        {board?.map(({ _id, name }: Board) => (
          <li key={`board-item-${_id}`} onClick={() => handleDeleteBoard(_id)}>
            <p>{name}</p>
            <BaseButton>게시판 폐쇄</BaseButton>
          </li>
        ))}
      </ul>
      {pageInfo && (
        <div className="mt-auto">
          <Pagination
            onPageChange={handleChangePage}
            total={pageInfo?.totalBoardCount}
            value={pageInfo?.currentPage - 1}
          >
            <Pagination.Navigator className="flex justify-center items-center gap-x-2">
              <Pagination.Buttons className="px-3 py-1 bg-gray-200 rounded-md hover:bg-violet-300" />
            </Pagination.Navigator>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default BoardList;
