import { getBoardBySigninUserId } from "@apis/board.api";
import { AspectRatio } from "blahblah-front-common-ui-kit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Board } from "~types/board.type";
import defaultImage from "../assets/image/defaultImg.svg";
import Spinner from "./Loading/spinner";

const ProfileBoard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [board, setBoard] = useState<Board[]>();

  useEffect(() => {
    setIsLoading(true);
    getBoardBySigninUserId() //
      .then(setBoard)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  return (
    <>
      <ul className="w-full py-4 flex flex-wrap  h-full">
        <div className="flex flex-wrap flex-grow">
          {board?.length === 0 ? (
            <div className="flex-1 flex justify-center items-center h-full text-gray-500 font-bold text-xl">
              <p>개설한 게시판이 없습니다.</p>
            </div>
          ) : (
            <>
              {board?.map(({ _id, image, name, approvalStatus }) => (
                <li
                  key={`board-item-${_id}`}
                  className="relative cursor-pointer w-1/4 shadow-md group h-fit"
                  onClick={() =>
                    approvalStatus === "승인" &&
                    navigate(`/board/dashboard/${_id}`)
                  }
                >
                  <AspectRatio ratio={1 / 1}>
                    <AspectRatio.Image
                      className="w-full h-full object-cover"
                      src={image || defaultImage}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      {approvalStatus === "대기" ? (
                        <p className="text-xl font-bold text-violet-800">
                          승인 대기중
                        </p>
                      ) : (
                        <p className="text-lg font-bold">{name}</p>
                      )}
                    </div>
                  </AspectRatio>
                </li>
              ))}
            </>
          )}
        </div>
      </ul>
    </>
  );
};

export default ProfileBoard;
