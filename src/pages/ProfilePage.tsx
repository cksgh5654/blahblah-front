import { useEffect, useMemo, useState } from "react";
import { getUserInfo } from "../apis/user.api";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "../components/Avatar";
import { Tabs } from "blahblah-front-common-ui-kit";
import BaseButton from "../components/Button/BaseButton";
import MyPosts from "../components/Post/MyPosts";
import MyComments from "../components/Comment/MyComments";

interface User {
  email: string;
  nickname: string;
  image: string;
  createdAt: string;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const { email: nickname } = useParams();

  const TabsDefaultValue = useMemo(
    () => window.location.hash,
    [window.location.hash]
  );
  useEffect(() => {
    if (!nickname) return;
    navigate("#myposts");
    getUserInfo(nickname) //
      .then(setUser);
  }, [nickname]);

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
            <BaseButton
              className="w-fit h-fit self-center"
              onClick={() => navigate(`/@${user?.nickname}/profile`)}
            >
              프로필 수정
            </BaseButton>
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
                  <p className="text-center">내 게시물 보기</p>
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="#mycomments"
                  onClick={() => navigate("#mycomments")}
                  className={`${
                    TabsDefaultValue === "#mycomments" &&
                    "border-b-2 border-violet-800 pb-2"
                  } flex justify-center items-center px-4`}
                >
                  <p>내 댓글 보기</p>
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="#myposts">
                <MyPosts />
              </Tabs.Content>
              <Tabs.Content value="#mycomments">
                <MyComments />
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
