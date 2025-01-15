import { useMemo } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { AspectRatio, Tabs } from "blahblah-front-common-ui-kit";
import WriteBoardNotification from "@components/WriteBoardNotification";
import BoardPosts from "@components/Post/BoardPosts";
import BoardUsers from "@components/BoardUsers";
import Avatar from "@components/Avatar";
import { Board } from "~types/board.type";
import defaultImage from "../assets/image/defaultImg.svg";

const BoardDashBoardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const board = useLoaderData<Board>();
  const selectedTab = useMemo(
    () => searchParams.get("selectedTab") || "USERS",
    [searchParams]
  );
  return (
    <div
      className="w-screen flex justify-center py-2"
      style={{ height: "calc(-68.5px + 100vh)" }}
    >
      <div className="w-[1280px] flex flex-col md:flex-row gap-x-8">
        <div className="flex gap-x-8 p-3 shadow-sm rounded-md h-fit md:flex-col">
          <div className="w-64">
            <AspectRatio ratio={1 / 1}>
              <AspectRatio.Image
                src={board?.image || defaultImage}
                alt="board-image"
                className="w-full h-full rounded-md"
              />
            </AspectRatio>
          </div>
          <div className="flex flex-col px-2 py-1 gap-y-4 flex-1">
            <div className="flex items-center gap-x-2">
              <Avatar url={board?.manager.image} size="small" />
              <p>{board?.manager.email}</p>
            </div>
            <div>
              <p className="text-xl font-bold text-violet-800">
                {board?.name}{" "}
                <span className="text-sm font-semibold text-violet-600">
                  #{board?.category}
                </span>
              </p>
              <div className="flex justify-between items-baseline">
                <p className="text-sm font-semibold text-gray-600">
                  {board?.createdAt.split("T")[0]} <span>생성됨</span>
                </p>
              </div>
            </div>
            <p className="text-gray-700">{board?.description}</p>
          </div>
        </div>
        <div className="w-full p-3 flex-grow flex flex-col">
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
            <Tabs.Content
              value="USERS"
              className={`${selectedTab === "USERS" && "h-full"}`}
            >
              <BoardUsers boardId={board._id} selectedTab={selectedTab} />
            </Tabs.Content>
            <Tabs.Content
              value="POSTS"
              className={`${selectedTab === "POSTS" && "h-full"}`}
            >
              <BoardPosts boardId={board._id} selectedTab={selectedTab} />
            </Tabs.Content>
            <Tabs.Content value="NOTIFICATION">
              <WriteBoardNotification boardUrl={board.url} />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
};

export default BoardDashBoardPage;
