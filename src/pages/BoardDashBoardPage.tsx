import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { AspectRatio, Tabs } from "blahblah-front-common-ui-kit";
import WriteBoardNotification from "@components/WriteBoardNotification";
import BoardPosts from "@components/Post/BoardPosts";
import BoardUsers from "@components/BoardUsers";
import Avatar from "@components/Avatar";
import { Board } from "~types/board.type";
import { getBoardById } from "@apis/board.api";

const BoardDashBoardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [board, setBoard] = useState<Board>();
  const { boardId } = useParams();
  const selectedTab = useMemo(
    () => searchParams.get("selectedTab") || "USERS",
    [searchParams]
  );

  useEffect(() => {
    if (!boardId) return;
    getBoardById(boardId) //
      .then(setBoard);
  }, []);
  return (
    <div
      className="w-screen flex justify-center py-2"
      style={{ height: "calc(-68.5px + 100vh)" }}
    >
      <div className="w-[1280px] flex gap-x-8">
        <div className="flex flex-col items-center p-3 shadow-md rounded-md h-fit">
          <div className="max-w-64">
            <AspectRatio ratio={1 / 1}>
              <AspectRatio.Image
                src={board?.image}
                alt="board-image"
                className="w-full h-full rounded-md"
              />
            </AspectRatio>
          </div>
          <div className="flex flex-col gap-y-4 pt-8 flex-1">
            <div className="flex items-center gap-x-2">
              <Avatar url={board?.manager.image} size="small" />
              <p>{board?.manager.email}</p>
            </div>
            <div>
              <p className="text-xl font-bold text-violet-800">{board?.name}</p>
              <div className="flex justify-between items-baseline">
                <p className="font-semibold text-violet-600">
                  #{board?.category}
                </p>
                <p className="text-sm font-semibold text-gray-500">
                  {board?.createdAt.split("T")[0]} <span>생성됨</span>
                </p>
              </div>
            </div>
            <p className="text-gray-700">{board?.description}</p>
          </div>
        </div>
        <div className="w-full p-3">
          <Tabs.Root defaultValue={selectedTab}>
            <Tabs.List className="w-fit flex text-sm font-semibold cursor-pointer mb-8">
              <Tabs.Trigger
                value="USERS"
                onClick={() => setSearchParams({ selectedTab: "USERS" })}
                className={`${
                  selectedTab === "USERS" && "border-b-2 border-violet-800 pb-2"
                } flex justify-center items-center px-4`}
              >
                <p className="text-center">회원 관리</p>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="POSTS"
                onClick={() => setSearchParams({ selectedTab: "POSTS" })}
                className={`${
                  selectedTab === "POSTS" && "border-b-2 border-violet-800 pb-2"
                } flex justify-center items-center px-4`}
              >
                <p className="text-center">게시글 내역</p>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="NOTIFICATION"
                onClick={() => setSearchParams({ selectedTab: "NOTIFICATION" })}
                className={`${
                  selectedTab === "NOTIFICATION" &&
                  "border-b-2 border-violet-800 pb-2"
                } flex justify-center items-center px-4`}
              >
                <p className="text-center">공지 작성</p>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="USERS">
              <BoardUsers boardId={boardId} />
            </Tabs.Content>
            <Tabs.Content value="POSTS">
              <BoardPosts boardId={boardId} />
            </Tabs.Content>
            <Tabs.Content value="NOTIFICATION">
              <WriteBoardNotification boardId={boardId} />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
};

export default BoardDashBoardPage;
