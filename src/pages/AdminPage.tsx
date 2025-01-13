import { deleteBoard } from "@apis/board.api";
import { deleteUser } from "@apis/user.api";
import BaseButton from "@components/Button/BaseButton";
import { Pagination, Tabs } from "blahblah-front-common-ui-kit";
import { useMemo, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { Board } from "~types/board.type";
import { User } from "~types/user.type";

const AdminPage = () => {
  const {
    board: initialBoard,
    users: initialUsers,
    pageInfo,
  } = useLoaderData();
  const [board, setBoard] = useState<Board[]>(initialBoard);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchParam, setSearchParams] = useSearchParams();
  const handleChangePage = (index: number) => {
    setSearchParams({ page: String(index + 1) });
  };
  const selectedTab = useMemo(
    () => searchParam.get("selectedTab") ?? "BOARD",
    [searchParam]
  );

  const handleDeleteBoard = (boardId: string) => {
    deleteBoard(boardId) //
      .then(() => {
        const updatedBoard = board.filter((board) => board._id !== boardId);
        setBoard(updatedBoard);
      });
  };

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId) //
      .then(() => {
        const updatedUsers = users.filter((user) => user._id !== userId);
        setUsers(updatedUsers);
      });
  };
  console.log(initialBoard);

  return (
    <>
      <p>admin</p>
      <Tabs.Root defaultValue={selectedTab}>
        <Tabs.List className="w-fit flex text-sm font-semibold cursor-pointer mb-8">
          <Tabs.Trigger
            value="BOARD"
            onClick={() => setSearchParams({ selectedTab: "BOARD" })}
            className={`${
              selectedTab === "BOARD" && "border-b-2 border-violet-800 pb-2"
            } flex justify-center items-center px-4`}
          >
            <p className="text-center">게시판 관리</p>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="USERS"
            onClick={() => setSearchParams({ selectedTab: "USERS" })}
            className={`${
              selectedTab === "USERS" && "border-b-2 border-violet-800 pb-2"
            } flex justify-center items-center px-4`}
          >
            <p className="text-center">회원 관리</p>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="BOARD">
          <ul>
            {board?.map(({ _id, name }: Board) => (
              <li
                key={`board-item-${_id}`}
                onClick={() => handleDeleteBoard(_id)}
              >
                <p>{name}</p>
                <BaseButton>게시판 폐쇄</BaseButton>
              </li>
            ))}
          </ul>
        </Tabs.Content>
        <Tabs.Content value="USERS">
          <ul>
            {users.map(({ _id, nickname }) => (
              <li key={`user-item-${_id}`}>
                <p>{nickname}</p>
                <BaseButton onClick={() => handleDeleteUser(_id)}>
                  유저 삭제
                </BaseButton>
              </li>
            ))}
          </ul>
        </Tabs.Content>
      </Tabs.Root>
      <Pagination
        onPageChange={handleChangePage}
        total={pageInfo?.totalBoardCount}
        value={pageInfo?.currentPage - 1}
      >
        <Pagination.Navigator className="flex justify-center items-center gap-x-2">
          <Pagination.Buttons className="px-3 py-1 bg-gray-200 rounded-md hover:bg-violet-300" />
        </Pagination.Navigator>
      </Pagination>
    </>
  );
};

export default AdminPage;
