import ReactQuillNew from 'react-quill-new';
import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BaseInput from '@components/Input/BaseInput';
import Editor from '@components/Editor/Editor';
import BaseButton from '@components/Button/BaseButton';
import { createPost } from '@apis/post.api';
import { PostTitleValidation } from '@utils/validation';
import { getBoard } from '@apis/board.api';

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
      alert('제목을 입력해주세요.');
      return;
    }

    try {
      const data = await createPost(url, title, content);
      const post = data.post;
      navigator(`/post/view/${post._id}`);
    } catch (err) {
      console.error(`[handlePostCreate] :`, err);
      if (!url) {
        navigator(`/`, { replace: true });
        return;
      }
      navigator(`/board/${url}`, { replace: true });
    }
  };

  const handleGetBoard = async (url: string) => {
    if (!url) {
      alert('존재하지 않는 게시판입니다.');
      return;
    }

    try {
      await getBoard(url);
    } catch (err) {
      console.error(`[handleGetBoard] :`, err);
      if (!url) {
        navigator(`/`, { replace: true });
        return;
      }
      navigator(`/board/${url}`, { replace: true });
    }
  };

  useEffect(() => {
    if (!QuillRef.current) return;

    if (url) {
      handleGetBoard(url);
    }
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
