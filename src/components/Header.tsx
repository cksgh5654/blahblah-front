import { useNavigate } from "react-router-dom";
import Logo from "./Icons/Logo";
import { useEffect, useState } from "react";
import defaultImg from "../../public/profileImg.svg";
import MagnifyingGlass from "./Icons/MagnifyingGlass";
type Profile = {
  email: string;
  nickname: string;
  image: string;
};
const Header = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile>();
  const [AvatarImage, setAvatarImage] = useState("");
  useEffect(() => {
    setAvatarImage(defaultImg);
  }, []);

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
        <div className="flex justify-center items-center gap-2">
          <button
            className={
              "flex justify-between items-center text-slate-400 text-sm text-nowrap"
            }
          >
            로그아웃
          </button>
          <button className="flex w-8 h-8" onClick={() => navigate("/profile")}>
            <img
              className="object-cover w-full h-full rounded-full cursor-pointer"
              src={AvatarImage}
              alt="Profile image"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
