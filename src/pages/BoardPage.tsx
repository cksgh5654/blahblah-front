import { Pagination, Tabs } from "blahblah-front-common-ui-kit";
import BaseButton from "../components/Button/BaseButton";
import CakeIcon from "../components/Icons/CakeIcon";
import CrownIcon from "../components/Icons/CrownIcon";
import MenIcon from "../components/Icons/MenIcon";
import { useEffect, useState } from "react";
import {
  getBoardAndPostsByUrlAndId,
  getBoardUserInfo,
} from "../apis/board.api";
import SpeechBubbleIcon from "@components/Icons/SpeechBubbleIcon";
import LoudSpeakerIcon from "@components/Icons/LoudSpeakerIcon";
import defaultImg from "../components/Card/defaultImg.svg";
import { useNavigate, useParams } from "react-router-dom";
import { createBoardUser } from "@apis/boardUser.api";
import axios from "axios";

interface Manager {
  email: string;
  nickname: string;
  _id: string;
}

interface Board {
  category: string;
  createdAt: string;
  deleteAt: string | null;
  description: string;
  image: string;
  manager: Manager;
  name: string;
  memberCount: number;
  updatedAt: string;
  url: string;
  _id: string;
  __v: number;
}
interface Creator {
  _id: string;
  email: string;
  nickname: string;
  image: string;
  deleteAt: Date | null;
}

interface Post {
  _id: string;
  board: string;
  content: string;
  createdAt: Date;
  creator: Creator;
  deletedAt: Date | null;
  title: string;
  type: "basic" | "notification";
  updatedAt: Date;
  __v: number;
}

const pageSize = 15;
const blockSize = 15;

const BoardPage = () => {
  const { url } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentNoticePage, setCurrentNoticePage] = useState(0);
  const [isNotice, setIsNotice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isApply, setIsApply] = useState(false);
  const [totalPostCount, setTotalPostCount] = useState({
    basic: 0,
    notification: 0,
  });
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [boardData, setBoardData] = useState<Board>({
    category: "",
    createdAt: "",
    deleteAt: null,
    description: "",
    image: "",
    manager: {
      email: "",
      nickname: "",
      _id: "",
    },
    name: "",
    memberCount: 0,
    updatedAt: "",
    url: "",
    _id: "",
    __v: 0,
  });
  const [basicPostData, setBasicPostData] = useState<Post[]>([]);
  const [notificationPostData, setNotificationPostData] = useState<Post[]>([]);
  const [isJoin, setIsJoin] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    if (!url) return;
    try {
      const data = await getBoardUserInfo(url);
      setIsJoin(data.isJoin);
      setIsApply(data.isApply);
      setCurrentUserId(data.userId);
    } catch (err) {
      console.log("fetchUserData 오류", err);
      if (axios.isAxiosError(err)) {
        alert(err.response?.data.message);
      }
    }
  };

  const fetchPostData = async () => {
    if (!url) return;
    try {
      const data = await getBoardAndPostsByUrlAndId(url, 0, pageSize);
      setBoardData(data.board);
      setBasicPostData(data.basicPosts);
      setNotificationPostData(data.notificationPosts);
      setTotalPostCount(data.totalPostCount);
    } catch (err) {
      console.log("fetchPostData 오류", err);
      if (axios.isAxiosError(err)) {
        if (err.status === 404) {
          navigate("/");
        }
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("signinStatus") === "true") {
      fetchUserData();
    }

    fetchPostData();
  }, []);

  const handlePageChange = async (index: number) => {
    setCurrentPage(index);
  };

  useEffect(() => {
    const pageMove = async () => {
      if (!url) return;
      const data = await getBoardAndPostsByUrlAndId(url, currentPage, pageSize);
      setBasicPostData(data.basicPosts);
    };
    pageMove();
  }, [currentPage]);

  const handleNoticePageChange = (index: number) => {
    setCurrentNoticePage(index);
  };

  useEffect(() => {
    const pageMove = async () => {
      if (!url) return;
      const data = await getBoardAndPostsByUrlAndId(
        url,
        currentNoticePage,
        pageSize
      );
      setNotificationPostData(data.notificationPosts);
    };
    pageMove();
  }, [currentNoticePage]);

  const handleClickJoin = async () => {
    setIsLoading(true);
    try {
      const response = await createBoardUser(boardData._id, currentUserId);
      alert(response);
      setIsApply(true);
    } catch (err) {
      console.log("handleClickJoin 오류", err);
      if (axios.isAxiosError(err)) {
        alert(err.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <main className="w-[1280px] px-8 py-16 flex gap-6 flex-col">
        <div>
          <div className="flex justify-between items-center pb-2">
            <h2 className="text-violet-800 text-3xl font-semibold">
              {boardData.name}
            </h2>
            {boardData.manager._id === currentUserId ? (
              <BaseButton
                onClick={() => navigate(`/board/dashboard/${boardData._id}`)}
              >
                게시판 관리
              </BaseButton>
            ) : (
              <BaseButton
                onClick={
                  currentUserId === ""
                    ? () => navigate("/signin")
                    : handleClickJoin
                }
                disabled={isLoading || isApply}
                className={isJoin ? "hidden" : "block"}
              >
                {isLoading
                  ? "신청 중..."
                  : isApply
                  ? "신청되었습니다."
                  : "가입하기"}
              </BaseButton>
            )}
          </div>
          <hr className="border-slate-300" />
        </div>
        <section className=" grid grid-cols-[1fr] lg:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_2fr_1fr] xl:grid-rows-1 gap-6">
          <img
            src={boardData.image ? boardData.image : defaultImg}
            alt={boardData.name}
            className="h-64 w-full object-cover border rounded-md border-slate-200 bg-slate-200"
          />
          <p className="flex items-center">{boardData.description}</p>
          <div className="h-full flex gap-2 xl:border-l xl:items-center col-span-1 lg:col-span-2 xl:col-span-1">
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-8 xl:gap-2 xl:flex-col">
              <div className="flex items-center xl:px-4">
                <figure className="flex items-center pr-2 gap-2">
                  <CrownIcon height="32px" />
                  <figcaption className="text-lg text-slate-800 truncate">
                    매니저
                  </figcaption>
                </figure>
                <p className="text-slate-600 truncate">
                  {boardData.manager.nickname} &#40;{boardData.manager.email}
                  &#41;
                </p>
              </div>
              <div className="flex items-center xl:px-4">
                <figure className="flex items-center pr-[1.5rem] lg:pr-2 xl:pr-[1.5rem] gap-2">
                  <MenIcon height="32px" />
                  <figcaption className="text-lg text-slate-800 truncate">
                    멤버
                  </figcaption>
                </figure>
                <p className="text-slate-600">{boardData.memberCount}명</p>
              </div>
              <div className="flex items-center xl:px-4">
                <figure className="flex items-center pr-2 gap-2">
                  <CakeIcon height="32px" />
                  <figcaption className="text-lg text-slate-800 truncate">
                    개설일
                  </figcaption>
                </figure>
                <p className="text-slate-600">
                  {boardData.createdAt.split("T")[0]}
                </p>
              </div>
            </div>
          </div>
        </section>
        <hr className="border-slate-300" />
        <Tabs.Root defaultValue="all">
          <div className="flex justify-between">
            <Tabs.List className="flex gap-2">
              <Tabs.Trigger value="all">
                <button
                  onClick={() => setIsNotice(false)}
                  className="bg-violet-300 text-white font-bold px-10 py-2 rounded-lg disabled:bg-violet-800"
                  disabled={!isNotice}
                >
                  일반
                </button>
              </Tabs.Trigger>
              <Tabs.Trigger value="notice">
                <button
                  onClick={() => setIsNotice(true)}
                  className="bg-violet-300 text-white font-bold px-10 py-2 rounded-lg disabled:bg-violet-800"
                  disabled={isNotice}
                >
                  공지
                </button>
              </Tabs.Trigger>
            </Tabs.List>
            <BaseButton
              onClick={() => navigate(`/post/create/${url}`)}
              className={
                isJoin || boardData.manager._id === currentUserId
                  ? "block"
                  : "hidden"
              }
            >
              글쓰기
            </BaseButton>
          </div>
          <div>
            <div className="grid grid-cols-[1fr_1fr_10fr_2fr_2fr] border-y-2 py-3 border-violet-800 text-center">
              <p>번호</p>
              <p>말머리</p>
              <p>제목</p>
              <p>글쓴이</p>
              <p>작성일</p>
            </div>
            <Tabs.Content value="all">
              {basicPostData.map((post, index) => (
                <div
                  key={post._id}
                  className="grid grid-cols-[1fr_1fr_10fr_2fr_2fr] border-b py-3 border-slate-300 text-center text-sm text-slate-500"
                >
                  <p>{index + 1}</p>
                  <p className="flex justify-center items-center">
                    {post.type === "notification" ? (
                      <LoudSpeakerIcon height="24px" />
                    ) : (
                      <SpeechBubbleIcon height="24px" />
                    )}
                  </p>
                  <button
                    onClick={() => {
                      navigate(`/post/view/${post._id}`);
                    }}
                    className="text-start px-8 hover:underline underline-offset-4 text-base text-slate-800"
                  >
                    {post.title}
                  </button>
                  <p>{post.creator?.nickname}</p>
                  <p>
                    {new Date(post.createdAt)
                      .toLocaleDateString("ko-KR", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/\.\s?/g, ".")
                      .replace(/(\d{2})\.(\d{2})\.(\d{2})/, "$1.$2.$3")}{" "}
                  </p>
                </div>
              ))}
              <Pagination
                total={totalPostCount.basic}
                value={currentPage}
                onPageChange={handlePageChange}
                className={`${
                  totalPostCount.basic === 0 && "hidden"
                } flex justify-center pt-8`}
                blockSize={blockSize}
                pageSize={pageSize}
              >
                <Pagination.Navigator className="flex gap-4">
                  <Pagination.Buttons className="PaginationButtons flex gap-4 font-bold text-slate-300" />
                </Pagination.Navigator>
              </Pagination>
            </Tabs.Content>
            <Tabs.Content value="notice">
              {notificationPostData.map((post, index) => (
                <div
                  key={post._id}
                  className="grid grid-cols-[1fr_1fr_10fr_2fr_2fr_1fr] border-b py-3 border-slate-300 text-center text-sm text-slate-500"
                >
                  <p>{index + 1}</p>
                  <p className="flex justify-center items-center">
                    {post.type === "notification" ? (
                      <LoudSpeakerIcon height="24px" />
                    ) : (
                      <SpeechBubbleIcon height="24px" />
                    )}
                  </p>
                  <button
                    onClick={() => {
                      navigate(`/post/view/${post._id}`);
                    }}
                    className="text-start px-8 hover:underline underline-offset-4 text-base text-slate-800"
                  >
                    {post.title}
                  </button>
                  <p>{post.creator?.nickname}</p>
                  <p>
                    {new Date(post.createdAt)
                      .toLocaleDateString("ko-KR", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/\.\s?/g, ".")
                      .replace(/(\d{2})\.(\d{2})\.(\d{2})/, "$1.$2.$3")}{" "}
                  </p>

                  <p>조회수</p>
                </div>
              ))}
              <Pagination
                total={totalPostCount.notification}
                value={currentNoticePage}
                onPageChange={handleNoticePageChange}
                className={`${
                  totalPostCount.notification === 0 && "hidden"
                } flex justify-center pt-8`}
                blockSize={blockSize}
                pageSize={pageSize}
              >
                <Pagination.Navigator className="flex gap-4">
                  <Pagination.Buttons className="PaginationButtons flex gap-4 font-bold text-slate-300" />
                </Pagination.Navigator>
              </Pagination>
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </main>

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

export default BoardPage;
