import { useMemo } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { Tabs } from "blahblah-front-common-ui-kit";
import Avatar from "@components/Avatar";
import BaseButton from "@components/Button/BaseButton";
import ProfileBoard from "@components/ProfileBoard";
import ProfileComments from "@components/Comment/ProfileComments";
import { User } from "~types/user.type";
import { useUserContext } from "@context/userContext";
import ProfilePosts from "@components/Post/ProfilePosts";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const profileUser = useLoaderData<User>();
  const { user: singinedUser } = useUserContext();
  const isSigninedUser = useMemo(
    () => profileUser?.email === singinedUser.email,
    [profileUser, singinedUser]
  );
  const TabsDefaultValue = useMemo(
    () => searchParams.get("selectedTab") || "posts",
    [searchParams]
  );

  return (
    <div
      className="flex flex-col items-center"
      style={{ height: "calc(-68.5px + 100vh)" }}
    >
      <div className="md:w-[768px] py-10 flex-grow">
        <div className="flex flex-col gap-y-8 h-full">
          <div className="flex flex-col items-center md:flex-row gap-x-8">
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
              <div className="flex flex-col items-center self-center">
                <BaseButton
                  className="w-fit mb-2"
                  onClick={() =>
                    navigate(`/profile/${profileUser?.email}/update`)
                  }
                >
                  프로필 수정
                </BaseButton>
                {singinedUser.role === "ADMIN" && (
                  <p
                    className="font-xl font-bold hover:underline cursor-pointer"
                    onClick={() => navigate("/admin")}
                  >
                    관리자 페이지로 가기
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="flex-grow">
            <Tabs.Root defaultValue={TabsDefaultValue}>
              <Tabs.List className="w-fit flex text-sm font-semibold cursor-pointer">
                <Tabs.Trigger
                  value="posts"
                  onClick={() =>
                    navigate(`?selectedTab=posts`, { replace: true })
                  }
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
                  onClick={() =>
                    navigate(`?selectedTab=comments`, { replace: true })
                  }
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
                    onClick={() =>
                      navigate(`?selectedTab=board`, { replace: true })
                    }
                    className={`${
                      TabsDefaultValue === "board" &&
                      "border-b-2 border-violet-800 pb-2"
                    } flex justify-center items-center px-4`}
                  >
                    <p>내가 개설한 게시판 보기</p>
                  </Tabs.Trigger>
                )}
              </Tabs.List>
              <Tabs.Content
                value="posts"
                className={`${TabsDefaultValue === "posts" && "h-full"}`}
              >
                <ProfilePosts
                  profileUser={profileUser}
                  selectedTab={TabsDefaultValue}
                />
              </Tabs.Content>
              <Tabs.Content
                value="comments"
                className={`${TabsDefaultValue === "comments" && "h-full"}`}
              >
                <ProfileComments
                  profileUser={profileUser}
                  selectedTab={TabsDefaultValue}
                />
              </Tabs.Content>
              <Tabs.Content
                value="board"
                className={`${TabsDefaultValue === "board" && "h-full"}`}
              >
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
