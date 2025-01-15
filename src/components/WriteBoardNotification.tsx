import { ChangeEvent, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs } from "blahblah-front-common-ui-kit";
import BaseInput from "./Input/BaseInput";
import Editor from "./Editor/Editor";
import BaseButton from "./Button/BaseButton";
import { createPost } from "@apis/post.api";
import { PostTitleValidation } from "@utils/validation";
import { toast } from "react-toastify";

interface WriteBoardNotificationProps {
  boardUrl?: string;
}

const WriteBoardNotification = ({ boardUrl }: WriteBoardNotificationProps) => {
  const [_, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isValidForm, setIsValidForm] = useState(false);
  const QuillRef = useRef(null);

  const handleValidationResult = (result: boolean) => {
    setIsValidForm(result);
  };
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    if (!boardUrl || !isValidForm) return;
    createPost(boardUrl, title, content, "notification") //
      .then(() => {
        setSearchParams({ selectedTab: "USERS" });
      })
      .catch(() => toast.error("게시물 작성에 실패하였습니다."));
  };
  return (
    <div className="bg-gray-50 rounded-lg shadow-md px-4 pt-4 pb-28 h-fit relative">
      <div>
        <BaseInput
          withLabel="공지사항 제목 (30자 이내)"
          onChange={handleChangeTitle}
          value={title}
          maxLength={30}
          validation={PostTitleValidation}
          onValidationResult={handleValidationResult}
        />
      </div>
      <div className="mt-5">
        <Editor
          QuillRef={QuillRef}
          content={content}
          setContent={setContent}
          height="500px"
        />
      </div>
      <BaseButton className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
        <Tabs.Trigger
          value="USERS"
          onClick={handleSubmit}
          className="list-none cursor-pointer"
        >
          공지등록하기
        </Tabs.Trigger>
      </BaseButton>
    </div>
  );
};

export default WriteBoardNotification;
