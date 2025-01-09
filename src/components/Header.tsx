import { useNavigate } from "react-router-dom";
import Logo from "./Icons/Logo";
import MagnifyingGlass from "./Icons/MagnifyingGlass";
import BaseButton from "./Button/BaseButton";
import Avatar from "./Avatar";
import { signout } from "../apis/auth.api";
import { useUserContext } from "../context/userContext";

const Header = () => {
  const navigate = useNavigate();
  const isSignined = localStorage.getItem("signinStatus");
  const { user } = useUserContext();
  const handleClickSignout = () => {
    signout() //
      .then(() => {
        window.location.href = "/signin";
      });
  };

  return (
    <header className="sticky top-0 bg-white flex justify-center border-b border-slate-300">
      <div className="flex justify-between px-8 py-4 gap-6 w-[1280px]">
        <button onClick={() => navigate("/")}>
          <Logo height="28px" />
        </button>
        <div className="flex w-full h-10 relative">
          <input
            type="search"
            placeholder="게시판 검색"
            className="w-full border rounded-md border-slate-300 pl-2"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <MagnifyingGlass height="30px" />
          </button>
        </div>
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
    </header>
  );
};

export default Header;
