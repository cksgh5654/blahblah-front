import { useEffect, useState } from "react";
import { Pagination } from "blahblah-front-common-ui-kit";
import { useNavigate, useSearchParams } from "react-router-dom";
import Avatar from "@components/Avatar";
import { Post } from "~types/post.type";
import { deletePost } from "@apis/post.api";
import { getBoardPosts } from "@apis/board.api";
import Spinner from "@components/Loading/spinner";
interface BoardPostsProps {
  boardId?: string;
  selectedTab: string;
}

type PageInfo = {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalPage: number;
  totalPostsCount: number;
};

const BoardPosts = ({ boardId, selectedTab }: BoardPostsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<Post[]>();
  const [pageInfo, setPageIfno] = useState<PageInfo>();
  const navigate = useNavigate();
  const handleClickDeletePost = (postId: string) => {
    deletePost(postId) //
      .then(() => {
        const updatedPosts = posts?.filter((post) => post._id !== postId);
        setPosts(updatedPosts);
      });
  };

  const handleChangePage = (index: number) => {
    setSearchParams({ selectedTab, page: String(index + 1) });
  };

  useEffect(() => {
    if (!boardId) return;
    const selectedTab = searchParams.get("selectedTab") || "POSTS";
    const page = searchParams.get("page") ?? "1";
    if (selectedTab !== "POSTS") return;
    setIsLoading(true);
    getBoardPosts(boardId, page, "20") //
      .then(({ posts, pageInfo }) => {
        setPosts(posts);
        setPageIfno(pageInfo);
      })
      .finally(() => setIsLoading(false));
  }, [searchParams]);

  if (isLoading)
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  return (
    <>
      <div
        className="flex flex-col p-4 bg-gray-50 rounded-lg shadow-md"
        style={{ height: "calc(-150px + 100vh)" }}
      >
        {posts?.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-500 font-bold text-xl">
            <p>작성된 게시글이 없습니다.</p>
          </div>
        ) : (
          <>
            <ul className="space-y-4 overflow-y-scroll scrollbar-hide">
              {posts?.map((post, index) => (
                <li
                  key={`post-item-${index}`}
                  className="flex items-center gap-x-4 p-1 bg-gray-50 rounded-lg shadow-md 
                 hover:bg-gray-100 hover:shadow-lg transition-all duration-300 ease-in"
                >
                  <Avatar
                    url={post.creator.image}
                    size="small"
                    onClick={() => navigate(`/profile/${post.creator.email}`)}
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      작성자: {post.creator.email}
                    </p>
                  </div>
                  <button
                    onClick={() => handleClickDeletePost(post._id)}
                    className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
            {pageInfo && (
              <div className="mt-auto flex justify-center">
                <Pagination
                  onPageChange={handleChangePage}
                  total={pageInfo?.totalPostsCount}
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
    </>
  );
};

export default BoardPosts;
