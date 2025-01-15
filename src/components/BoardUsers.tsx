import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Pagination } from "blahblah-front-common-ui-kit";

import Avatar from "./Avatar";
import BaseButton from "./Button/BaseButton";
import { BoardUser } from "~types/user.type";
import {
  getBoardUsers,
  kickBoardUser,
  updateBoardUserJoinedStatus,
} from "@apis/boardUser.api";
import { toast } from "react-toastify";
import Spinner from "./Loading/spinner";

interface BoardUsersProps {
  boardId?: string;
  selectedTab: string;
}
type PageInfo = {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalPage: number;
  totalUsersCount: number;
};

const BoardUsers = ({ boardId, selectedTab }: BoardUsersProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<BoardUser[]>();
  const [pageInfo, setPageIfno] = useState<PageInfo>();

  const handleChangePage = (index: number) => {
    setSearchParams({ selectedTab, page: String(index + 1) });
  };

  const handleClickKickUser = (userId: string) => {
    if (!boardId) return;
    kickBoardUser(boardId, userId) //
      .then(() => {
        toast.success("유저를 추방하였습니다.");
        const newUsers = users?.filter(({ user }) => user._id !== userId);
        setUsers(newUsers);
      })
      .catch(() => toast.error("유저 정보를 업데이트 하지 못했습니다."));
  };

  const handleUserRegistration = (status: boolean, userId: string) => {
    if (!boardId) return;
    updateBoardUserJoinedStatus(status, boardId, userId) //
      .then(() => {
        toast.success(`유저를 ${status ? "승인" : "미승인"} 하였습니다.`);
        const newUsers = status
          ? users?.map((user) =>
              user.user._id === userId ? { ...user, joinedStatus: true } : user
            )
          : users?.filter(({ user }) => user._id !== userId);
        setUsers(newUsers);
      })
      .catch(() => toast.error("유저 정보를 업데이트 하지 못했습니다."));
  };

  useEffect(() => {
    if (!boardId) return;
    const selectedTab = searchParams.get("selectedTab") || "USERS";
    const page = searchParams.get("page") ?? "1";
    if (selectedTab !== "USERS") return;
    setIsLoading(true);
    getBoardUsers(boardId, page) //
      .then(({ users, pageInfo }) => {
        setUsers(users);
        setPageIfno(pageInfo);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [boardId, searchParams]);

  if (isLoading)
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  return (
    <div
      className="flex flex-col p-4 bg-gray-50 rounded-lg shadow-md"
      style={{ height: "calc(-150px + 100vh)" }}
    >
      {users?.length === 0 ? (
        <div className="flex justify-center items-center h-full text-gray-500 font-bold text-xl">
          <p>가입한 유저가 없습니다.</p>
        </div>
      ) : (
        <>
          <ul className="space-y-4 flex-1 overflow-y-scroll scrollbar-hide">
            {users?.map(({ user, joinedStatus }, index) => (
              <li
                key={`user-item-${index}`}
                className="flex items-center gap-x-4 p-2 bg-gray-50 rounded-lg shadow-md 
        hover:bg-gray-100 hover:shadow-lg transition-all duration-300 ease-in"
              >
                <Avatar
                  url={user?.image}
                  size="small"
                  onClick={() => navigate(`/${user.email}`)}
                />
                <p
                  className="flex-1 text-gray-800 font-medium cursor-pointer"
                  onClick={() => navigate(`/profile/${user.email}`)}
                >
                  {user?.email}
                </p>
                {joinedStatus ? (
                  <BaseButton
                    className="bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() => handleClickKickUser(user._id)}
                  >
                    추방
                  </BaseButton>
                ) : (
                  <div className="flex gap-x-2">
                    <BaseButton
                      className="hover:bg-violet-600"
                      onClick={() => handleUserRegistration(true, user._id)}
                    >
                      승인
                    </BaseButton>
                    <BaseButton
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                      onClick={() => handleUserRegistration(false, user._id)}
                    >
                      미승인
                    </BaseButton>
                  </div>
                )}
              </li>
            ))}
          </ul>
          {pageInfo && (
            <div className="mt-auto flex justify-center">
              <Pagination
                onPageChange={handleChangePage}
                total={pageInfo?.totalUsersCount}
                value={pageInfo?.currentPage - 1}
              >
                <Pagination.Navigator className="flex gap-4">
                  <Pagination.Buttons className="PaginationButtons flex gap-4 font-bold text-slate-300" />
                </Pagination.Navigator>
              </Pagination>
            </div>
          )}
        </>
      )}
      <style>
        {`
            .PaginationButtons button:disabled {
              color: #5B21B6;
            }
          `}
      </style>
    </div>
  );
};

export default BoardUsers;
