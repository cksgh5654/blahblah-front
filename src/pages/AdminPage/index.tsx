import { Tabs } from "blahblah-front-common-ui-kit";
import { useSearchParams } from "react-router-dom";
import UserList from "./components/UserList";
import BoardList from "./components/BoardList";
import { useMemo } from "react";

const AdminPage = () => {
  const [searchParam, setSearchParams] = useSearchParams();
  const selectedTab = useMemo(
    () => searchParam.get("selectedTab") ?? "BOARD",
    [searchParam]
  );

  return (
    <>
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
          <BoardList />
        </Tabs.Content>
        <Tabs.Content value="USERS">
          <UserList />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default AdminPage;
