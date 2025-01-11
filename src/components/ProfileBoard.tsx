import { getBoardBySigninUserId } from "@apis/board.api";
import { AspectRatio } from "blahblah-front-common-ui-kit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Board } from "~types/board.type";

const ProfileBoard = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState<Board[]>();
  useEffect(() => {
    getBoardBySigninUserId() //
      .then(setBoard);
  }, []);
  return (
    <>
      <ul className="py-4 flex flex-wrap">
        {board?.map(({ _id, image, name, url }) => (
          <li
            key={`board-item-${_id}`}
            className="relative cursor-pointer w-1/3 shadow-md group"
            onClick={() => navigate(`/board/${url}`)}
          >
            <AspectRatio ratio={1 / 1}>
              <AspectRatio.Image
                className="w-full h-full object-cover"
                src={image}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-lg font-bold">{name}</p>
              </div>
            </AspectRatio>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProfileBoard;
