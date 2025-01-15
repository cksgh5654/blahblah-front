import { useNavigate } from "react-router-dom";
import Logo from "./Icons/Logo";
import MagnifyingGlass from "./Icons/MagnifyingGlass";
import BaseButton from "./Button/BaseButton";
import Avatar from "./Avatar";
import { useUserContext } from "@context/userContext";
import { signout } from "@apis/auth.api";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { getBoardsByHeader } from "@apis/board.api";
import useDebounce from "@pages/useDebounce";

interface Board {
  name: string;
  url: string;
}

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [boardsData, setBoardsData] = useState<Board[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const headerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const isSignined = localStorage.getItem("signinStatus");
  const { user } = useUserContext();

  const handleClickOutside = (e: MouseEvent) => {
    if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
      setSearchTerm("");
    }
  };

  useEffect(() => {
    if (searchTerm) {
      document.addEventListener("click", handleClickOutside, { capture: true });
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchTerm, setSearchTerm]);

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

  useEffect(() => {
    if (!searchTerm) {
      setBoardsData([]);
    }
  }, [searchTerm]);

  const submitOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
      setBoardsData([]);
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className="sticky flex justify-center z-10 top-0 bg-white  border-b border-slate-300"
      >
        <div className="relative flex justify-between px-8 py-4 gap-6 w-[1280px]">
          <button
            onClick={() => {
              navigate("/");
              setSearchTerm("");
            }}
          >
            <Logo height="28px" />
          </button>

          <div className="flex w-full h-10 relative">
            <input
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={submitOnEnter}
              type="search"
              placeholder="게시판 검색"
              className="w-full h-full border rounded-md border-slate-300 pl-2"
            />
            <button
              disabled={!searchTerm}
              onClick={() => {
                navigate(`/search/${searchTerm}`);
                setSearchTerm("");
                setBoardsData([]);
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <MagnifyingGlass height="30px" />
            </button>
          </div>
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
                  onClick={() => {
                    setSearchTerm("");
                    setBoardsData([]);
                    navigate(`/profile/${user.email}`);
                  }}
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
        <nav
          className={`${
            searchTerm || "hidden"
          } absolute top-[73px] w-full flex justify-center bg-white shadow-md`}
        >
          <div className="w-[1280px] h-80 border-b ">
            <div
              className="grid w-[1280px] gap-2 p-8 items-start"
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
                    setSearchTerm("");
                    setBoardsData([]);
                  }}
                >
                  {board.name}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>
      <style>{`
    input::-ms-clear,
    input::-ms-reveal{display:none;width:0;height:0;}
    input::-webkit-search-decoration,
    input::-webkit-search-cancel-button,
    input::-webkit-search-results-button,
    input::-webkit-search-results-decoration{display:none;}
  `}</style>
    </>
  );
};

export default Header;
