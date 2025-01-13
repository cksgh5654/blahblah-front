import { deleteUser, getUsers } from "@apis/user.api";
import BaseButton from "@components/Button/BaseButton";
import { Pagination } from "blahblah-front-common-ui-kit";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { User } from "~types/user.type";

type PageInfo = {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalPage: number;
  totalUsersCount: number;
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>();
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangePage = async (index: number) => {
    setSearchParams({ selectedTab: "USERS", page: String(index + 1) });
  };

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId) //
      .then(() => {
        const updatedUsers = users?.filter((user) => user._id !== userId);
        setUsers(updatedUsers);
      });
  };

  useEffect(() => {
    const selectedTab = searchParams.get("selectedTab") || "USERS";
    const page = searchParams.get("page") || "1";
    if (selectedTab !== "USERS") return;
    getUsers(page) //
      .then(({ users, pageInfo }) => {
        setUsers(users);
        setPageInfo(pageInfo);
      });
  }, [searchParams]);

  return (
    <>
      <ul>
        {users?.map(({ _id, nickname }) => (
          <li key={`user-item-${_id}`}>
            <p>{nickname}</p>
            <BaseButton onClick={() => handleDeleteUser(_id)}>
              유저 삭제
            </BaseButton>
          </li>
        ))}
      </ul>
      {pageInfo && (
        <div className="mt-auto">
          <Pagination
            onPageChange={handleChangePage}
            total={pageInfo?.totalUsersCount}
            value={pageInfo?.currentPage - 1}
          >
            <Pagination.Navigator className="flex justify-center items-center gap-x-2">
              <Pagination.Buttons className="px-3 py-1 bg-gray-200 rounded-md hover:bg-violet-300" />
            </Pagination.Navigator>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default UserList;
