import { Tabs } from "blahblah-front-common-ui-kit";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserList from "./components/UserList";
import BoardList from "./components/BoardList";
import { useMemo } from "react";

const AdminPage = () => {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const selectedTab = useMemo(
    () => searchParam.get("selectedTab") ?? "BOARD",
    [searchParam]
  );

  return (
    <div
      className="flex flex-col items-center"
      style={{ height: "calc(-68.5px + 100vh)" }}
    >
      <div className="w-[768px] py-8 flex-grow">
        <Tabs.Root defaultValue={selectedTab}>
          <Tabs.List className="w-fit flex text-sm font-semibold cursor-pointer">
            <Tabs.Trigger
              value="BOARD"
              onClick={() =>
                navigate(`/admin?selectedTab=BOARD`, { replace: true })
              }
              className={`${
                selectedTab === "BOARD" && "border-b-2 border-violet-800 pb-2"
              } flex justify-center items-center px-4`}
            >
              <p className="text-center">게시판 관리</p>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="USERS"
              onClick={() =>
                navigate(`/admin?selectedTab=USERS`, { replace: true })
              }
              className={`${
                selectedTab === "USERS" && "border-b-2 border-violet-800 pb-2"
              } flex justify-center items-center px-4`}
            >
              <p className="text-center">회원 관리</p>
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content
            value="BOARD"
            className={`${selectedTab === "BOARD" && "h-full"}`}
          >
            <BoardList />
          </Tabs.Content>
          <Tabs.Content
            value="USERS"
            className={`${selectedTab === "USERS" && "h-full"}`}
          >
            <UserList />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default AdminPage;
