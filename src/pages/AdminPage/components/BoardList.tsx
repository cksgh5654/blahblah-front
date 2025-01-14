import { deleteBoard, getBoards } from "@apis/board.api";
import Avatar from "@components/Avatar";
import BaseButton from "@components/Button/BaseButton";
import { AspectRatio, Pagination } from "blahblah-front-common-ui-kit";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const navigate = useNavigate();

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
    <div className="flex flex-col h-full bg-gray-50 p-4 rounded-md shadow-lg">
      <ul className="space-y-4 flex-grow">
        {board?.map(({ _id, name, image, manager, url }: Board) => (
          <li
            key={`board-item-${_id}`}
            className="flex items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div
              className="w-16 h-16 flex-shrink-0 cursor-pointer"
              onClick={() => navigate(`/board/${url}`)}
            >
              <AspectRatio ratio={1 / 1}>
                <AspectRatio.Image
                  src={image}
                  className="w-full h-full object-cover rounded-md"
                />
              </AspectRatio>
            </div>
            <div className="ml-4 flex-grow">
              <p
                className="font-medium text-gray-800 hover:underline cursor-pointer"
                onClick={() => navigate(`/board/${url}`)}
              >
                {name}
              </p>
              <p
                className="text-sm text-gray-500 flex items-center gap-x-2 cursor-pointer hover:underline"
                onClick={() => navigate(`/${manager.email}`)}
              >
                <Avatar url={manager.image} size="small" />
                {manager.email}
              </p>
            </div>
            <BaseButton
              onClick={() => handleDeleteBoard(_id)}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              게시판 폐쇄
            </BaseButton>
          </li>
        ))}
      </ul>
      {pageInfo && (
        <div className="py-4">
          <Pagination
            onPageChange={handleChangePage}
            total={pageInfo?.totalBoardCount}
            value={pageInfo?.currentPage - 1}
          >
            <Pagination.Navigator className="flex justify-center items-center gap-x-2">
              <Pagination.Buttons className="px-3 py-1 bg-gray-200 rounded-md hover:bg-violet-300 active:bg-violet-400" />
            </Pagination.Navigator>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default BoardList;
