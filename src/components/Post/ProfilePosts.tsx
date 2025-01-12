import { AspectRatio, Pagination } from "blahblah-front-common-ui-kit";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";
import { User } from "~types/user.type";
import { getPostsByUserId } from "@apis/post.api";
import { ProfilePost } from "~types/post.type";
import { useNavigate, useSearchParams } from "react-router-dom";
import ErrorPage from "@pages/ErrorPage";

interface ProfilePostsProps {
  profileUser?: User;
  selectedTab: string;
}

export type PageInfo = {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalPage: number;
  totalPostsCount: number;
};

const ProfilePosts = ({ profileUser, selectedTab }: ProfilePostsProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<ProfilePost[]>();
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const { user: signinedUser } = useUserContext();

  const handleChangePage = (index: number) => {
    setSearchParams({ selectedTab, page: String(index + 1) });
  };

  useEffect(() => {
    if (!profileUser || !signinedUser) return;
    const page = searchParams.get("page") ?? "1";

    getPostsByUserId(profileUser ? profileUser._id : signinedUser._id, page) //
      .then(({ posts, pageInfo }) => {
        setPosts(posts);
        setPageInfo(pageInfo);
      });
  }, [profileUser, searchParams]);

  if (!profileUser) return <ErrorPage />;

  return (
    <div className="h-full flex flex-col">
      <ul className="flex-1">
        {posts?.map(({ title, createdAt, board, _id }) => (
          <li
            className="p-4 border-b border-gray-300 hover:bg-gray-50 transition duration-200"
            key={`post-item-${_id}`}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <AspectRatio className="w-14 h-14 shrink-0" ratio={1 / 1}>
                  <AspectRatio.Image
                    src={board.image}
                    alt="board-image"
                    className="w-full h-full object-cover rounded-md shadow-md"
                  />
                </AspectRatio>
                <div className="flex flex-col justify-center gap-1">
                  <span
                    className="text-2xl font-bold text-violet-800 hover:underline cursor-pointer"
                    onClick={() => navigate(`/board/${board.url}`)}
                  >
                    {board.name}
                  </span>
                  <span className="text-sm text-gray-600">
                    게시판에 작성한 게시글
                  </span>
                </div>
              </div>
              <div className="flex items-baseline">
                <h1
                  className="text-lg font-bold text-gray-800 hover:underline cursor-pointer"
                  onClick={() => navigate(`/post/view/${_id}`)}
                >
                  {title}
                </h1>
                <span className="text-sm text-gray-500 ml-2 font-bold">
                  {createdAt.split("T")[0]}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {pageInfo && (
        <div>
          <Pagination
            onPageChange={handleChangePage}
            total={pageInfo?.totalPostsCount ?? 0}
            value={pageInfo?.currentPage - 1}
            className="flex justify-center"
          >
            <Pagination.Navigator className="flex gap-4 mt-2">
              <Pagination.Buttons className="PaginationButtons flex gap-4 font-bold text-slate-300" />
            </Pagination.Navigator>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ProfilePosts;
