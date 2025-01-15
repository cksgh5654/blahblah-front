import { deleteBoard, getBoards, updateBoardStatus } from "@apis/board.api";
import Avatar from "@components/Avatar";
import BaseButton from "@components/Button/BaseButton";
import { AspectRatio, Pagination } from "blahblah-front-common-ui-kit";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
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

  const handleUpdateBoardStatus = (
    boardId: string,
    status: "승인" | "미승인"
  ) => {
    updateBoardStatus(boardId, status) //
      .then((response) => {
        toast.success(response.message);
        if (status === "승인") {
          const updated = board?.map((board) => {
            if (board._id === boardId) {
              return { ...board, approvalStatus: status };
            }
            return board;
          });
          setBoard(updated);
        } else {
          const updated = board?.filter((board) => board._id !== boardId);
          setBoard(updated);
        }
      })
      .catch((error) => toast.error(error.message));
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
  console.log(board);
  return (
    <div className="flex flex-col h-full bg-gray-50 p-4 rounded-md shadow-lg">
      <ul className="space-y-4 flex-grow">
        {board?.map(({ _id, name, image, manager, url, approvalStatus }) => (
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
              <div className="flex items-center gap-x-2">
                <Avatar url={manager.image} size="small" />
                <p
                  className="text-sm text-gray-500 flex self-end gap-x-2 cursor-pointer hover:underline"
                  onClick={() => navigate(`/${manager.email}`)}
                >
                  {manager.email}
                </p>
              </div>
            </div>
            {approvalStatus === "대기" ? (
              <div>
                <BaseButton
                  onClick={() => handleUpdateBoardStatus(_id, "승인")}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  승인
                </BaseButton>
                <BaseButton
                  onClick={() => handleUpdateBoardStatus(_id, "미승인")}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  미승인
                </BaseButton>
              </div>
            ) : (
              <BaseButton
                onClick={() => handleDeleteBoard(_id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                게시판 폐쇄
              </BaseButton>
            )}
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
