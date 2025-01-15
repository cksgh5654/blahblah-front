import { getCommentsByUserId } from "@apis/comment.api";
import { useUserContext } from "@context/userContext";
import { AspectRatio, Pagination } from "blahblah-front-common-ui-kit";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ProfileComment } from "~types/comment.type";
import { User } from "~types/user.type";
import defaultImage from "../../assets/image/defaultImg.svg";
import Spinner from "@components/Loading/spinner";
interface ProfileCommentsProps {
  profileUser?: User;
  selectedTab: string;
}

export type PageInfo = {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalPage: number;
  totalCommentsCount: number;
};

const ProfileComments = ({ profileUser }: ProfileCommentsProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [comments, setComments] = useState<ProfileComment[]>();
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const { user: signinedUser } = useUserContext();

  const handleChangePage = (index: number) => {
    navigate(`?selectedTab=commets&page=${index + 1}`, { replace: true });
  };

  useEffect(() => {
    if (!profileUser || !signinedUser) return;
    const selectedTab = searchParams.get("selectedTab") || "comments";
    const page = searchParams.get("page") ?? "1";
    if (selectedTab !== "comments") return;
    setIsLoading(true);
    getCommentsByUserId(profileUser ? profileUser._id : signinedUser._id, page) //
      .then(({ comments, pageInfo }) => {
        setComments(comments);
        setPageInfo(pageInfo);
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
      {comments?.length === 0 ? (
        <div className="flex justify-center items-center h-full text-gray-500 font-bold text-xl">
          <p>작성한 댓글이 없습니다.</p>
        </div>
      ) : (
        <>
          <ul className="flex-1">
            {comments?.map(({ content, createdAt, post, _id }) => (
              <li
                className="flex gap-x-2 p-4 border-b border-gray-300 hover:bg-gray-50 transition duration-200"
                key={`comments-item-${_id}`}
              >
                <div>
                  <AspectRatio className="w-14 self-start" ratio={1 / 1}>
                    <AspectRatio.Image
                      src={post.board?.image || defaultImage}
                      alt="board-image"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </AspectRatio>
                </div>
                <div className="flex-grow">
                  <div>
                    <span
                      className="text-xl font-bold text-violet-800 hover:underline cursor-pointer"
                      onClick={() => navigate(`/post/view/${post._id}`)}
                    >
                      {post.title}{" "}
                    </span>
                    <span className="text-base font-semibold">
                      에 남긴 댓글
                    </span>
                  </div>
                  <p className="line-clamp-1">{content}</p>
                  <span className="text-sm text-gray-500 font-bold">
                    {createdAt.split("T")[0]}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div>
            {pageInfo && (
              <Pagination
                onPageChange={handleChangePage}
                total={pageInfo?.totalCommentsCount ?? 0}
                value={pageInfo?.currentPage - 1}
                className="flex justify-center"
              >
                <Pagination.Navigator className="flex gap-4 mt-2">
                  <Pagination.Buttons className="PaginationButtons flex gap-4 font-bold text-slate-300" />
                </Pagination.Navigator>
              </Pagination>
            )}
          </div>
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

export default ProfileComments;
