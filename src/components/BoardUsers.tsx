import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Pagination } from "blahblah-front-common-ui-kit";
import { BoardUser } from "../types/user.type";
import {
  getBoardUsers,
  kickBoardUser,
  updateBoardUserJoinedStatus,
} from "../apis/boardUser.api";

interface BoardUsersProps {
  boardId?: string;
}
type PageInfo = {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalPage: number;
  totalUsersCount: number;
};

const BoardUsers = ({ boardId }: BoardUsersProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState<BoardUser[]>();
  const [pageInfo, setPageIfno] = useState<PageInfo>();

  const handleChangePage = (index: number) => {
    console.log({ index, pageInfo });
    navigate(`?page=${index + 1}&limit=20#users`);
  };

  const handleClickKickUser = (userId: string) => {
    if (!boardId) return;
    kickBoardUser(boardId, userId) //
      .then(() => {
        const newUsers = users?.filter(({ user }) => user._id !== userId);
        setUsers(newUsers);
      });
  };

  const handleUserRegistration = (status: boolean, userId: string) => {
    if (!boardId) return;
    console.log({ status, userId });
    updateBoardUserJoinedStatus(status, boardId, userId) //
      .then(() => {
        const newUsers = status
          ? users?.map((user) =>
              user.user._id === userId ? { ...user, joinedStatus: true } : user
            )
          : users?.filter(({ user }) => user._id !== userId);
        setUsers(newUsers);
      });
  };

  useEffect(() => {
    if (!boardId) return;
    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "20";

    getBoardUsers(boardId, page, limit) //
      .then(({ users, pageInfo }) => {
        setUsers(users);
        setPageIfno(pageInfo);
      })
      .catch((error) => console.log(error));
  }, [boardId, searchParams]);
  return (
    <>
      <p>게시판 회원</p>
      {users?.map(({ user, joinedStatus }, index) => (
        <li key={`user-item-${index}`} className="flex">
          <p>{user.email}</p>
          <img src={user.image} alt="user-image" className="w-8 h-8" />
          {joinedStatus ? (
            <button
              className="border border-black"
              onClick={() => handleClickKickUser(user._id)}
            >
              추방
            </button>
          ) : (
            <div className="border border-black">
              <button
                className="border border-black"
                onClick={() => handleUserRegistration(true, user._id)}
              >
                승인
              </button>
              <button
                className="border border-black"
                onClick={() => handleUserRegistration(false, user._id)}
              >
                미승인
              </button>
            </div>
          )}
        </li>
      ))}

      <Pagination
        onPageChange={handleChangePage}
        total={pageInfo?.totalUsersCount ?? 0}
        value={pageInfo?.currentPage ?? 0}
      >
        <Pagination.Navigator style={{ display: "flex" }}>
          <Pagination.Buttons />
        </Pagination.Navigator>
      </Pagination>
    </>
  );
};

export default BoardUsers;
