import { getBoardBySigninUserId } from "@apis/board.api";
import { AspectRatio } from "blahblah-front-common-ui-kit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Board } from "~types/board.type";
import defaultImage from "../assets/image/defaultImg.svg";

const ProfileBoard = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState<Board[]>();

  useEffect(() => {
    getBoardBySigninUserId() //
      .then(setBoard);
  }, []);

  if (!board?.length) {
    return (
      <div className="flex-1 flex justify-center items-center h-full text-gray-500 font-bold text-xl">
        <p>개설한 게시판이 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <ul className="w-full py-4 flex flex-wrap">
        <div className="flex flex-wrap flex-grow">
          {board?.map(({ _id, image, name, url }) => (
            <li
              key={`board-item-${_id}`}
              className="relative cursor-pointer w-1/4 shadow-md group"
              onClick={() => navigate(`/board/${url}`)}
            >
              <AspectRatio ratio={1 / 1}>
                <AspectRatio.Image
                  className="w-full h-full object-cover"
                  src={image || defaultImage}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-lg font-bold">{name}</p>
                </div>
              </AspectRatio>
            </li>
          ))}
        </div>
      </ul>
    </>
  );
};

export default ProfileBoard;
