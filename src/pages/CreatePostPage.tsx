import ReactQuillNew from 'react-quill-new';
import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BaseInput from '@components/Input/BaseInput';
import Editor from '@components/Editor/Editor';
import BaseButton from '@components/Button/BaseButton';
import { createPost } from '@apis/post.api';
import { PostTitleValidation } from '@utils/validation';

/***
 * boardId가 아무값이 들어왔을 떄 x
 */

const CreatePostPage = () => {
  const navigator = useNavigate();
  const { url = '' } = useParams();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isVaild, setIsVaild] = useState<boolean>(false);
  const QuillRef = useRef<ReactQuillNew>(null);

  const handleTitleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleValidationChange = (result: boolean) => {
    setIsVaild(result);
  };

  const handlePostCreate = async () => {
    if (!url) {
      alert('존재하지 않는 게시판입니다.');
      return;
    }

    if (!isVaild) {
      return;
    }

    if (!content) {
      alert('내용을 입력해주세요.');
      return;
    }

    const data = await createPost(url, title, content);
    if (!data.isError) {
      alert(data.message);
      navigator(`/board/${url}`);
    }
  };

  useEffect(() => {
    if (!QuillRef.current) return;
  }, []);

  return (
    <div className="w-screen flex justify-center items-center py-20">
      <div className="max-w-3xl">
        <h1 className="text-center text-2xl font-bold pb-12">게시글 작성</h1>

        <div className="py-5">
          <BaseInput
            withLabel="게시글 제목 (30자 이내)"
            onChange={handleTitleInput}
            value={title}
            maxLength={30}
            validation={PostTitleValidation}
            onValidationResult={handleValidationChange}
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
          <BaseButton onClick={() => navigator(`/board/${url}`)}>
            목록으로
          </BaseButton>
          <BaseButton onClick={handlePostCreate}>등록하기</BaseButton>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
