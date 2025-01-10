import { ChangeEvent, useRef, useState } from "react";
import { PostTitleValidation } from "../utils/validation";
import { createPost } from "../apis/post.api";
import { useSearchParams } from "react-router-dom";
import { Tabs } from "blahblah-front-common-ui-kit";
import BaseInput from "./Input/BaseInput";
import Editor from "./Editor/Editor";

interface WriteBoardNotificationProps {
  boardId?: string;
}

const WriteBoardNotification = ({ boardId }: WriteBoardNotificationProps) => {
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
    if (!boardId || !isValidForm) return;
    createPost(boardId, title, content, "notification") //
      .then(() => setSearchParams({ selectedTab: "USERS" }));
  };
  return (
    <div>
      <form>
        <div className="py-5">
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
          />
        </div>
        <div className="flex justify-end gap-10 mt-20">
          <Tabs.Trigger value="USERS" onClick={handleSubmit}>
            공지등록하기
          </Tabs.Trigger>
        </div>
      </form>
    </div>
  );
};

export default WriteBoardNotification;
