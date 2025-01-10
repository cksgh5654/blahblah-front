import { AspectRatio } from "blahblah-front-common-ui-kit";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";
import { User } from "~types/user.type";
import { getPostsByUserId } from "@apis/post.api";

interface MyPostsProps {
  profileUser?: User;
}

const ProfilePosts = ({ profileUser }: MyPostsProps) => {
  const [posts, setPosts] = useState();
  const [pageInfo, setPageInfo] = useState();
  const { user: signinedUser } = useUserContext();
  useEffect(() => {
    if (!profileUser || !signinedUser) return;
    getPostsByUserId(profileUser ? profileUser._id : signinedUser._id) //
      .then(({ posts, pageInfo }) => {
        setPosts(posts);
        setPageInfo(pageInfo);
      });
  }, [profileUser]);
  console.log({ pageInfo, posts });
  return (
    <>
      <ul className="py-4">
        <li className="flex p-4 border-b">
          <div className="flex gap-x-2">
            <AspectRatio className="w-12 flex-shrink-0 self-start">
              <AspectRatio.Image
                src="/favicon.svg"
                alt="board-image"
                className="w-full h-full object-contain"
              />
            </AspectRatio>
            <div className="flex flex-col">
              <div className="flex items-center gap-x-4 py-2">
                <p className="font-medium">ehdrjs130</p>
                <p className="text-gray-500">2025-01-01</p>
              </div>
              <div className="bg-gray-100/60 p-4 rounded-md">
                <h1 className="text-xl font-bold">피자가 먹고 싶어요!</h1>
                <p className="line-clamp-2">
                  베이컨 포테이토 피자가 먹고싶습니다. 피자 한판 정도는 혼자서
                  먹을수있지 않나요?? 저는 L사이즈 혼자서 다먹을 수있습니다!
                </p>
              </div>
            </div>
          </div>
        </li>
        <li className="flex p-4 border-b">
          <div className="flex gap-x-2">
            <AspectRatio className="w-12 flex-shrink-0 self-start">
              <AspectRatio.Image
                src="/favicon.svg"
                alt="board-image"
                className="w-full h-full object-contain"
              />
            </AspectRatio>
            <div className="flex flex-col">
              <div className="flex items-center gap-x-4 py-2">
                <p className="font-medium">ehdrjs130</p>
                <p className="text-gray-500">2025-01-01</p>
              </div>
              <div className="bg-gray-100/60 p-4 rounded-md">
                <h1 className="text-xl font-bold">피자가 먹고 싶어요!</h1>
                <p className="line-clamp-2">
                  베이컨 포테이토 피자가 먹고싶습니다. 피자 한판 정도는 혼자서
                  먹을수있지 않나요?? 저는 L사이즈 혼자서 다먹을 수있습니다!
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};

export default ProfilePosts;
