import { useNavigate } from "react-router-dom";
import defaultImg from "./defaultImg.svg";

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
  memberCount: number;
  name: string;
  postCount: number;
  updatedAt: string;
  url: string;
  _id: string;
  __v: number;
}

interface CardProps {
  data: Board;
}
const Card = ({ data }: CardProps) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(`/board/${data.url}`)}>
      <figure className="flex flex-col rounded-lg border border-slate-300 drop-shadow">
        <img
          src={data.image ? data.image : defaultImg}
          alt={data.name}
          className="rounded-t-lg h-52 object-cover"
        />
        <div className="flex flex-col items-start p-4 gap-4 bg-white rounded-b-lg">
          <figcaption className="text-left">
            <h3 className="text-xl mb-2">{data.name}</h3>
            <p
              className="text-slate-500 h-[70px] overflow-hidden text-ellipsis"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
            >
              {data.description}
            </p>
          </figcaption>
          <div className="w-full">
            <hr className="border-slate-300 pb-2" />
            <div className="flex justify-between text-slate-500">
              <p className="truncate">
                {data.manager?.nickname} ({data.manager?.email})
              </p>
              <p className="text-nowrap">{data.memberCount}명</p>
            </div>
          </div>
        </div>
      </figure>
    </button>
  );
};
export default Card;
