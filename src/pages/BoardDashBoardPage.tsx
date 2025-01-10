import { useEffect, useMemo, useState } from "react";
import { getBoardById } from "../apis/board.api";
import { useParams, useSearchParams } from "react-router-dom";
import { Board } from "../types/board.type";
import { AspectRatio, Tabs } from "blahblah-front-common-ui-kit";
import BoardUsers from "../components/BoardUsers";
import BoardPosts from "../components/Post/BoardPosts";
import WriteBoardNotification from "../components/WriteBoardNotification";

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
    <div className="w-screen flex justify-center">
      <div className="w-[1280px] flex">
        <div>
          <div className="w-40">
            <AspectRatio ratio={1 / 1}>
              <AspectRatio.Image
                src={board?.image}
                alt="board-image"
                className="w-full h-full rounded-md"
              />
            </AspectRatio>
          </div>
          <p>
            게시판 이름 : <span>{board?.name}</span>
          </p>
          <p>{board?.description}</p>
          <p>
            매니저: <span>{board?.manager.email}</span>
          </p>
          <p></p>
        </div>
        <div>
          <Tabs.Root defaultValue={selectedTab}>
            <Tabs.List className="flex gap-x-4">
              <Tabs.Trigger
                value="USERS"
                onClick={() => setSearchParams({ selectedTab: "USERS" })}
              >
                회원 관리
              </Tabs.Trigger>
              <Tabs.Trigger
                value="POSTS"
                onClick={() => setSearchParams({ selectedTab: "POSTS" })}
              >
                게시글 내역
              </Tabs.Trigger>
              <Tabs.Trigger
                value="NOTIFICATION"
                onClick={() => setSearchParams({ selectedTab: "NOTIFICATION" })}
              >
                공지 작성
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
