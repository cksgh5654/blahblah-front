import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Tabs } from "blahblah-front-common-ui-kit";
import Avatar from "@components/Avatar";
import BaseButton from "@components/Button/BaseButton";
import MyPosts from "@components/Post/MyPosts";
import MyComments from "@components/Comment/MyComments";
import ProfileBoard from "@components/ProfileBoard";
import ProfilePosts from "@components/Post/ProfilePosts";
import ProfileComments from "@components/Comment/ProfileComments";
import { User } from "~types/user.type";
import { useUserContext } from "@context/userContext";
import { getUserInfo } from "@apis/user.api";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const { user: singinedUser } = useUserContext();
  const { email } = useParams();
  const isSigninedUser = useMemo(
    () => user?.email === singinedUser.email,
    [user, singinedUser]
  );
  const TabsDefaultValue = useMemo(
    () => window.location.hash,
    [window.location.hash]
  );

  useEffect(() => {
    if (!email) return;
    navigate("#myposts");
    getUserInfo(email) //
      .then(setUser);
  }, [email]);

  return (
    <div
      className="w-screen flex flex-col items-center"
      style={{ height: "calc(-68.5px + 100vh)" }}
    >
      <div className="w-[768px] py-10">
        <div className="flex flex-col gap-y-8">
          <div className="flex gap-x-8">
            <Avatar size="large" url={user?.image} />
            <div className="flex-1 flex flex-col py-4">
              <h1>{user?.email}</h1>
              <p className="text-gray-500 text-sm">{user?.nickname}</p>
              <p className="text-gray-500 text-sm">
                가입한 날짜 : <span>{user?.createdAt.split("T")[0]}</span>
              </p>
            </div>
            {isSigninedUser && (
              <BaseButton
                className="w-fit h-fit self-center"
                onClick={() => navigate(`/${user?.email}/profile`)}
              >
                프로필 수정
              </BaseButton>
            )}
          </div>
          <div>
            <Tabs.Root defaultValue="#myposts">
              <Tabs.List className="w-fit flex text-sm font-semibold cursor-pointer">
                <Tabs.Trigger
                  value="#myposts"
                  onClick={() => navigate("#myposts")}
                  className={`${
                    TabsDefaultValue === "#myposts" &&
                    "border-b-2 border-violet-800 pb-2"
                  } flex justify-center items-center px-4`}
                >
                  <p className="text-center">
                    {isSigninedUser ? "내 게시물 보기" : "게시물 보기"}
                  </p>
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="#mycomments"
                  onClick={() => navigate("#mycomments")}
                  className={`${
                    TabsDefaultValue === "#mycomments" &&
                    "border-b-2 border-violet-800 pb-2"
                  } flex justify-center items-center px-4`}
                >
                  <p>{isSigninedUser ? "내 댓글 보기" : "댓글 보기"}</p>
                </Tabs.Trigger>
                {isSigninedUser && (
                  <Tabs.Trigger
                    value="#myboard"
                    onClick={() => navigate("#myboard")}
                    className={`${
                      TabsDefaultValue === "#myboard" &&
                      "border-b-2 border-violet-800 pb-2"
                    } flex justify-center items-center px-4`}
                  >
                    <p>내가 개설한 게시판 보기</p>
                  </Tabs.Trigger>
                )}
              </Tabs.List>
              <Tabs.Content value="#myposts">
                <MyPosts />
              </Tabs.Content>
              <Tabs.Content value="#mycomments">
                <MyComments />
              </Tabs.Content>
              <Tabs.Content value="#myboard">
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
