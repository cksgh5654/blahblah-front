import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Tabs } from "blahblah-front-common-ui-kit";
import Avatar from "@components/Avatar";
import BaseButton from "@components/Button/BaseButton";
import ProfileBoard from "@components/ProfileBoard";
import ProfilePosts from "@components/Post/ProfilePosts";
import ProfileComments from "@components/Comment/ProfileComments";
import { User } from "~types/user.type";
import { useUserContext } from "@context/userContext";
import { getUserInfo } from "@apis/user.api";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [profileUser, setProfileUser] = useState<User>();
  const { user: singinedUser } = useUserContext();
  const { email } = useParams();
  const isSigninedUser = useMemo(
    () => profileUser?.email === singinedUser.email,
    [profileUser, singinedUser]
  );
  const TabsDefaultValue = useMemo(
    () => searchParams.get("selectedTab") || "posts",
    [searchParams]
  );

  useEffect(() => {
    if (!email) return;
    getUserInfo(email) //
      .then(setProfileUser);
  }, [email]);

  return (
    <div
      className="w-screen flex flex-col items-center"
      style={{ height: "calc(-68.5px + 100vh)" }}
    >
      <div className="w-[768px] py-10">
        <div className="flex flex-col gap-y-8">
          <div className="flex gap-x-8">
            <Avatar size="large" url={profileUser?.image} />
            <div className="flex-1 flex flex-col py-4">
              <h1>{profileUser?.email}</h1>
              <p className="text-gray-500 text-sm">{profileUser?.nickname}</p>
              <p className="text-gray-500 text-sm">
                가입한 날짜 :{" "}
                <span>{profileUser?.createdAt.split("T")[0]}</span>
              </p>
            </div>
            {isSigninedUser && (
              <BaseButton
                className="w-fit h-fit self-center"
                onClick={() => navigate(`/${profileUser?.email}/profile`)}
              >
                프로필 수정
              </BaseButton>
            )}
          </div>
          <div>
            <Tabs.Root defaultValue="posts">
              <Tabs.List className="w-fit flex text-sm font-semibold cursor-pointer">
                <Tabs.Trigger
                  value="posts"
                  onClick={() => setSearchParams({ selectedTab: "posts" })}
                  className={`${
                    TabsDefaultValue === "posts" &&
                    "border-b-2 border-violet-800 pb-2"
                  } flex justify-center items-center px-4`}
                >
                  <p className="text-center">
                    {isSigninedUser ? "내 게시물 보기" : "게시물 보기"}
                  </p>
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="comments"
                  onClick={() => setSearchParams({ selectedTab: "comments" })}
                  className={`${
                    TabsDefaultValue === "comments" &&
                    "border-b-2 border-violet-800 pb-2"
                  } flex justify-center items-center px-4`}
                >
                  <p>{isSigninedUser ? "내 댓글 보기" : "댓글 보기"}</p>
                </Tabs.Trigger>
                {isSigninedUser && (
                  <Tabs.Trigger
                    value="board"
                    onClick={() => setSearchParams({ selectedTab: "board" })}
                    className={`${
                      TabsDefaultValue === "board" &&
                      "border-b-2 border-violet-800 pb-2"
                    } flex justify-center items-center px-4`}
                  >
                    <p>내가 개설한 게시판 보기</p>
                  </Tabs.Trigger>
                )}
              </Tabs.List>
              <Tabs.Content value="posts">
                <ProfilePosts profileUser={profileUser} />
              </Tabs.Content>
              <Tabs.Content value="comments">
                <ProfileComments />
              </Tabs.Content>
              <Tabs.Content value="board">
                {isSigninedUser && <ProfileBoard />}
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
