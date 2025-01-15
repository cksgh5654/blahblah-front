import { AspectRatio, Pagination } from "blahblah-front-common-ui-kit";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";
import { User } from "~types/user.type";
import { getPostsByUserId } from "@apis/post.api";
import { ProfilePost } from "~types/post.type";
import { useNavigate, useSearchParams } from "react-router-dom";
import defaultImage from "../../assets/image/defaultImg.svg";
import Spinner from "@components/Loading/spinner";

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

const ProfilePosts = ({ profileUser }: ProfilePostsProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState<ProfilePost[]>();
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const { user: signinedUser } = useUserContext();

  const handleChangePage = (index: number) => {
    navigate(`?selectedTab=posts&page=${index + 1}`, { replace: true });
  };

  useEffect(() => {
    if (!profileUser || !signinedUser) return;
    const selectedTab = searchParams.get("selectedTab") || "posts";
    const page = searchParams.get("page") ?? "1";
    if (selectedTab !== "posts") return;
    setIsLoading(true);
    getPostsByUserId(profileUser ? profileUser._id : signinedUser._id, page) //
      .then(({ posts, pageInfo }) => {
        setPosts(posts);
        setPageInfo(pageInfo);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  }, [profileUser, searchParams]);

  if (isLoading)
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  return (
    <div className="h-full flex flex-col">
      {posts?.length === 0 ? (
        <div className="flex justify-center items-center h-full text-gray-500 font-bold text-xl">
          <p>작성한 게시글이 없습니다.</p>
        </div>
      ) : (
        <>
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
                        src={board?.image || defaultImage}
                        alt="board-image"
                        className="w-full h-full object-cover rounded-md shadow-md"
                      />
                    </AspectRatio>
                    <div className="flex flex-col justify-center gap-1">
                      <span
                        className="text-2xl font-bold text-violet-800 hover:underline cursor-pointer"
                        onClick={() => navigate(`/board/${board.url}`)}
                      >
                        {board?.name}
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

export default ProfilePosts;
