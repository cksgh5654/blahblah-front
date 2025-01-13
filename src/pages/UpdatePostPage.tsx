import ReactQuillNew from 'react-quill-new';
import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BaseInput from '@components/Input/BaseInput';
import Editor from '@components/Editor/Editor';
import BaseButton from '@components/Button/BaseButton';
import { deletePost, getPostData, updatePost } from '@apis/post.api';
import { PostTitleValidation } from '@utils/validation';

const UpdatePostPage = () => {
  const navigator = useNavigate();
  const { postId = '' } = useParams();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isVaild, setIsVaild] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const QuillRef = useRef<ReactQuillNew>(null);

  const handleTitleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleValidationChange = (result: boolean) => {
    setIsVaild(result);
  };

  const handlePostUpdate = async (postId: string) => {
    if (!isVaild) {
      return;
    }

    if (!content) {
      alert('내용을 입력해주세요.');
      return;
    }

    const data = await updatePost(title, content, postId);

    if (!data.isError) {
      navigator(`/post/view/${postId}`);
    }
  };

  const handlePostDelete = async (postId: string) => {
    const data = await deletePost(postId);

    if (!data.isError) {
      navigator(`/board/${url}`);
    }
  };

  const handleGetPost = async (postId: string) => {
    try {
      const response = await getPostData(postId);
      const post = response.post;

      setUrl(post.board.url);
      setTitle(post.title || '');
      setContent(post.content || '');

      if (post.title && post.content) {
        setIsVaild(true);
      }
    } catch (err) {
      console.error(`[handleGetPost] : ${err}`);
      navigator(`/board/${url}`);
    }
  };

  useEffect(() => {
    if (!QuillRef.current) return;

    if (postId) {
      handleGetPost(postId);
      return;
    }
  }, []);

  return (
    <div className="w-screen flex justify-center items-center py-20">
      <div className="max-w-3xl">
        <h1 className="text-center text-2xl font-bold pb-12">게시글 수정</h1>

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

        <div className="flex gap-10 mt-20 justify-between">
          <BaseButton onClick={() => navigator(`/board/${url}`)}>
            목록으로
          </BaseButton>

          <div className="flex gap-10">
            <BaseButton onClick={() => handlePostUpdate(postId)}>
              수정하기
            </BaseButton>
            <BaseButton onClick={() => handlePostDelete(postId)}>
              삭제하기
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePostPage;
