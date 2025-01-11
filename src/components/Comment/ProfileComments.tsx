import { getCommentsByUserId } from "@apis/comment.api";
import { useUserContext } from "@context/userContext";
import { AspectRatio } from "blahblah-front-common-ui-kit";
import { useEffect, useState } from "react";
import { User } from "~types/user.type";
interface ProfileCommentsProps {
  profileUser?: User;
}

const ProfileComments = ({ profileUser }: ProfileCommentsProps) => {
  const [comments, setComments] = useState();
  const [pageInfo, setPageInfo] = useState();
  const { user: signinedUser } = useUserContext();
  useEffect(() => {
    if (!profileUser || !signinedUser) return;
    getCommentsByUserId(profileUser ? profileUser._id : signinedUser._id) //
      .then(({ comments, pageInfo }) => {
        setComments(comments);
        setPageInfo(pageInfo);
      });
  }, [profileUser]);
  console.log({ pageInfo, comments });

  return (
    <ul className="py-4">
      <li className="flex gap-x-2 p-4">
        <div>
          <AspectRatio className="w-12 flex-shrink-0 self-start">
            <AspectRatio.Image
              src="/favicon.svg"
              alt="board-image"
              className="w-full h-full object-contain"
            />
          </AspectRatio>
        </div>
        <div>
          <div>
            <span
              className="text-xl font-bold text-violet-800 cursor-pointer"
              onClick={() => console.log("해당 게실물 이동")}
            >
              피자가 먹고 싶어요!{" "}
            </span>
            <span className="text-base font-semibold">에 남긴 댓글</span>
          </div>
          <p className="line-clamp-1">
            저도 다이어트 중이라 피자가 자꾸 생각이나네용.....
          </p>
          <span className="text-gray-500 text-sm">2025-01-01</span>
        </div>
      </li>
    </ul>
  );
};

export default ProfileComments;
