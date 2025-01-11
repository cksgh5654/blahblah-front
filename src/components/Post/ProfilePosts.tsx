import { AspectRatio, Pagination } from "blahblah-front-common-ui-kit";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";
import { User } from "~types/user.type";
import { getPostsByUserId } from "@apis/post.api";
import { ProfilePost } from "~types/post.type";
import { useSearchParams } from "react-router-dom";

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
  return (
    <>
      <ul className="py-4">
        {posts?.map(({ title, createdAt, board, _id }) => (
          <li className="p-4 border-b" key={`post-item-${_id}`}>
            <div className="flex gap-x-2">
              <div className="flex flex-col">
                <AspectRatio className="w-14 self-start" ratio={1 / 1}>
                  <AspectRatio.Image
                    src={board.image}
                    alt="board-image"
                    className="w-full h-full object-contain"
                  />
                </AspectRatio>
                <p className="text-center">{board.name}</p>
              </div>
              <div className="flex flex-col flex-grow">
                <div className="items-center gap-x-4 py-2">
                  <p className="font-medium">{profileUser?.nickname}</p>
                  <p className="text-gray-500">{createdAt.split("T")[0]}</p>
                </div>
                <div className="p-4 rounded-md bg-gray-100/60">
                  <h1 className="text-xl font-bold">{title}</h1>
                </div>
              </div>
            </div>
          </li>
        ))}
        {pageInfo && (
          <Pagination
            onPageChange={handleChangePage}
            total={pageInfo?.totalPostsCount ?? 0}
            value={pageInfo?.currentPage - 1}
          >
            <Pagination.Navigator className="flex justify-center items-center gap-x-2">
              <Pagination.Buttons className="px-3 py-1 bg-gray-200 rounded-md hover:bg-violet-300" />
            </Pagination.Navigator>
          </Pagination>
        )}
      </ul>
    </>
  );
};

export default ProfilePosts;
