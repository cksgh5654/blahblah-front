import { useNavigate } from "react-router-dom";
import Logo from "./Icons/Logo";
import MagnifyingGlass from "./Icons/MagnifyingGlass";
import BaseButton from "./Button/BaseButton";
import Avatar from "./Avatar";
import { useUserContext } from "@context/userContext";
import { signout } from "@apis/auth.api";
import { ChangeEvent, useEffect, useState } from "react";
import { getBoardsByHeader } from "@apis/board.api";
import useDebounce from "@pages/useDebounce";
import Popover from "./Popover";

interface Board {
  name: string;
  url: string;
}

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [boardsData, setBoardsData] = useState<Board[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const navigate = useNavigate();
  const isSignined = localStorage.getItem("signinStatus");
  const { user } = useUserContext();
  const handleClickSignout = () => {
    signout() //
      .then(() => {
        window.location.href = "/signin";
      });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeBoard = async (value: string) => {
    try {
      const response = await getBoardsByHeader(value);
      setBoardsData(response.boards.boards);
    } catch (error) {
      console.error("게시판을 가져오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleChangeBoard(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  console.log(boardsData);

  return (
    <header className="sticky top-0 bg-white  border-b border-slate-300">
      <Popover
        isOpen={isOpen}
        onToggle={setIsOpen}
        className="flex justify-center"
        position="bottom-fixed"
      >
        <div className="flex justify-between px-8 py-4 gap-6 w-[1280px]">
          <button
            onClick={() => {
              navigate("/");
              setSearchTerm("");
            }}
          >
            <Logo height="28px" />
          </button>
          <Popover.Trigger className="flex w-full h-10 relative">
            <input
              value={searchTerm}
              onChange={handleInputChange}
              onClick={() => setIsOpen((prev) => !prev)}
              type="search"
              placeholder="게시판 검색"
              className="w-full h-full border rounded-md border-slate-300 pl-2"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <MagnifyingGlass height="30px" />
            </div>
          </Popover.Trigger>

          <div className="flex justify-center items-center gap-2">
            {isSignined && JSON.parse(isSignined) ? (
              <>
                <button
                  className="flex justify-between items-center text-slate-400 text-sm text-nowrap"
                  onClick={handleClickSignout}
                >
                  로그아웃
                </button>
                <Avatar
                  url={user.image}
                  size="small"
                  onClick={() => navigate(`/${user.email}`)}
                />
              </>
            ) : (
              <>
                <BaseButton
                  className="flex justify-between items-center text-slate-400 text-sm text-nowrap"
                  onClick={() => navigate("/signin")}
                >
                  로그인 하러가기
                </BaseButton>
              </>
            )}
          </div>
        </div>
        <Popover.Content
          className={`${
            isOpen ? "block" : "hidden"
          } flex justify-center overflow-y-scroll w-full h-80 mt-4 py-8 border-b bg-white`}
        >
          <div
            className="grid w-[1280px] gap-2 px-8 items-start"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(164px, 1fr))",
            }}
          >
            {boardsData.map((board) => (
              <button
                key={board.url}
                className="text-start text-slate-400 hover:text-slate-800"
                onClick={() => {
                  navigate(`/board/${board.url}`);
                  setBoardsData([]);
                  setIsOpen((prev) => !prev);
                  setSearchTerm("");
                }}
              >
                {board.name}
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover>
    </header>
  );
};

export default Header;
