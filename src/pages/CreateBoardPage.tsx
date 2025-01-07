import { ChangeEvent, useState } from "react";
import CameraIcon from "../components/Icons/CameraIcon";

const CreateBoardPage = () => {
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [addressCount, setAddressCount] = useState(0);

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionCount(e.target.value.length);
  };
  const handleChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressCount(e.target.value.length);
  };
  return (
    <div className="h-screen flex justify-center">
      <main className="w-[1280px] h-full px-8 pt-16 flex gap-6 flex-col">
        <input
          type="text"
          placeholder="게시판 이름을 입력해주세요."
          name="name"
          id="name"
          required
          className="border-b-2 w-full h-10 border-slate-300 text-2xl focus:outline-none focus:border-violet-800 placeholder:text-2xl placeholder:text-slate-300"
        />
        <section className="grid grid-cols-[1fr_2fr] gap-6">
          <div className="flex h-52 justify-center items-center rounded-md bg-slate-100">
            <label
              htmlFor="img"
              className=" py-2 px-4 mb-2 rounded-md cursor-pointer text-slate-500 duration-300 hover:text-indigo-700"
            >
              <CameraIcon />
              대표 사진 추가
            </label>
            <input
              type="file"
              name="img"
              id="img"
              className="hidden"
              multiple
              accept="image/*"
            />
          </div>
          <div>
            <div className="flex justify-between pb-1">
              <label htmlFor="description" className="text-lg">
                게시판 설명
              </label>
              <p className="text-sm text-slate-500">{descriptionCount}/200</p>
            </div>
            <textarea
              onChange={handleChangeDescription}
              placeholder="게시판 설명을 입력해주세요."
              id=" description"
              maxLength={200}
              className="w-full h-[calc(100%-28px)] px-2 py-3 text-sm border border-slate-300 rounded-lg outline-violet-800"
            />
          </div>
        </section>
        <hr className="border-slate-300" />
        <section className="flex items-center w-full">
          <label htmlFor="address" className="pl-4 pr-8 text-nowrap text-lg">
            주소
          </label>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center w-full">
              <p className="pr-2">http://localhost:5173/board/</p>
              <input
                onChange={handleChangeAddress}
                type="text"
                className="w-full px-2 py-3 text-sm border border-slate-300 rounded-lg outline-violet-800"
                placeholder="나머지 주소를 입력해주세요."
                maxLength={20}
              />
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-red-400">
                주소는 수정이 불가능합니다. 신중히 입력해주세요.
              </p>
              <p className="text-sm text-slate-500">{addressCount}/20</p>
            </div>
          </div>
        </section>
        <hr className="border-slate-300" />
      </main>
    </div>
  );
};

export default CreateBoardPage;
