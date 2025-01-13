import BaseButton from "@components/Button/BaseButton";
import { Pagination, Tabs } from "blahblah-front-common-ui-kit";
import { useMemo } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { Board } from "~types/board.type";

const AdminPage = () => {
  const { board, users, pageInfo } = useLoaderData();
  const [searchParam, setSearchParams] = useSearchParams();
  const handleChangePage = (index: number) => {
    setSearchParams({ page: String(index + 1) });
  };
  const selectedTab = useMemo(
    () => searchParam.get("selectedTab") ?? "BOARD",
    [searchParam]
  );
  console.log(board, users);
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
              <li key={`board-item-${_id}`}>
                <p>{name}</p>
                <BaseButton>게시판 폐쇄</BaseButton>
              </li>
            ))}
          </ul>
        </Tabs.Content>
        <Tabs.Content value="USERS">users</Tabs.Content>
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
