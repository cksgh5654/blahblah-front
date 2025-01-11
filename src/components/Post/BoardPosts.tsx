import { useEffect, useState } from "react";
import { Pagination } from "blahblah-front-common-ui-kit";
import { useNavigate, useSearchParams } from "react-router-dom";
import Avatar from "@components/Avatar";
import { Post } from "~types/post.type";
import { deletePost } from "@apis/post.api";
import { getBoardPosts } from "@apis/board.api";
interface BoardPostsProps {
  boardId?: string;
}

type PageInfo = {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalPage: number;
  totalPostsCount: number;
};

const BoardPosts = ({ boardId }: BoardPostsProps) => {
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

  const handleChangePage = () => {
    setSearchParams({ page: String(pageInfo?.nextPage) });
  };

  useEffect(() => {
    if (!boardId) return;
    const page = searchParams.get("page") ?? "1";

    getBoardPosts(boardId, page, "20") //
      .then(({ posts, pageInfo }) => {
        setPosts(posts);
        setPageIfno(pageInfo);
      });
  }, []);
  return (
    <>
      <div
        className="flex flex-col p-4 bg-gray-50 rounded-lg shadow-md"
        style={{ height: "calc(-150px + 100vh)" }}
      >
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
                onClick={() => navigate(`/${post.creator.email}`)}
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
        {posts?.length === 0 && (
          <p className="text-center text-gray-500 mt-4">게시글이 없습니다.</p>
        )}
        <div className="mt-auto">
          <Pagination
            onPageChange={handleChangePage}
            total={pageInfo?.totalPostsCount ?? 0}
            value={pageInfo?.currentPage ?? 0}
          >
            <Pagination.Navigator className="flex justify-center items-center gap-x-2">
              <Pagination.Buttons className="px-3 py-1 bg-gray-200 rounded-md hover:bg-violet-300" />
            </Pagination.Navigator>
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default BoardPosts;
