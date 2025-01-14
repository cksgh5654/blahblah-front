import { deleteUser, getUsers } from "@apis/user.api";
import Avatar from "@components/Avatar";
import BaseButton from "@components/Button/BaseButton";
import { Pagination } from "blahblah-front-common-ui-kit";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const navigate = useNavigate();

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
    <div className="flex flex-col h-full bg-gray-50 p-4 rounded-md shadow-lg">
      <ul className="space-y-4 flex-grow">
        {users?.map(({ _id, email, image, createdAt }) => (
          <li
            key={`user-item-${_id}`}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center gap-x-2">
              <Avatar url={image} size="small" />
              <p
                className="text-gray-800 font-medium hover:underline cursor-pointer"
                onClick={() => navigate(`/${email}`)}
              >
                {email}
              </p>
            </div>
            <p className="text-gray-600 text-sm font-bold">
              {createdAt.split("T")[0]}
            </p>
            <BaseButton
              onClick={() => handleDeleteUser(_id)}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              유저 삭제
            </BaseButton>
          </li>
        ))}
      </ul>
      {pageInfo && (
        <div className="py-4">
          <Pagination
            onPageChange={handleChangePage}
            total={pageInfo?.totalUsersCount}
            value={pageInfo?.currentPage - 1}
          >
            <Pagination.Navigator className="flex justify-center items-center gap-x-2">
              <Pagination.Buttons className="px-3 py-1 bg-gray-200 rounded-md hover:bg-violet-300 active:bg-violet-400" />
            </Pagination.Navigator>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default UserList;
