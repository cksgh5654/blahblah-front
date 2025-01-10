import { useEffect, useMemo, useState } from "react";
import { getBoardById } from "../apis/board.api";
import { useNavigate, useParams } from "react-router-dom";
import { Board } from "../types/board.type";
import { AspectRatio, Tabs } from "blahblah-front-common-ui-kit";
import BoardUsers from "../components/BoardUsers";
import BoardPosts from "../components/Post/BoardPosts";
import WriteBoardNotification from "../components/WriteBoardNotification";

const BoardDashBoardPage = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState<Board>();
  const { boardId } = useParams();
  const selectedTabs = useMemo(
    () => window.location.hash,
    [window.location.hash]
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
          <Tabs.Root defaultValue={selectedTabs}>
            <Tabs.List className="flex gap-x-4">
              <Tabs.Trigger
                value="#users"
                onClick={() => navigate(`?page=1&limit=10#users`)}
              >
                회원 관리
              </Tabs.Trigger>
              <Tabs.Trigger
                value="#posts"
                onClick={() => navigate("?page=1&limit=10#posts")}
              >
                게시글 내역
              </Tabs.Trigger>
              <Tabs.Trigger
                value="#notification"
                onClick={() => navigate("#notification")}
              >
                공지 작성
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="#users">
              <BoardUsers boardId={boardId} />
            </Tabs.Content>
            <Tabs.Content value="#posts">
              <BoardPosts boardId={boardId} />
            </Tabs.Content>
            <Tabs.Content value="#notification">
              <WriteBoardNotification />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
};

export default BoardDashBoardPage;
