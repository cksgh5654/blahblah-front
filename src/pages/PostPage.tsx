import ReactQuillNew from 'react-quill-new';
import { ChangeEvent, useState, useRef, useEffect } from 'react';
import BaseInput from '../components/Input/BaseInput';
import BaseButton from '../components/Button/BaseButton';
import { useNavigate, useParams } from 'react-router-dom';
import { PostTitleValidation } from '../utils/validation';
import {
  getPostData,
  createPost,
  updatePost,
  deletePost,
} from '../apis/post.api';
import Editor from '../components/Editor/Editor';

const PostPage = () => {
  const navigator = useNavigate();

  const {
    boardId = '677e83b45e306601cbb21bb1',
    postId,
    // postId = '677e9d96f28c4c6603555b14',
  } = useParams();

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

  const handlePostCreate = () => {
    if (!boardId) {
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

    createPost(boardId, title, content).then((data) => {
      if (!data.isError) {
        alert(data.message);
      }
    });
  };

  const handlePostUpdate = (postId: string) => {
    if (!postId) {
      alert('존재하지 않는 게시글입니다.');
      return;
    }

    if (!isVaild) {
      return;
    }

    if (!content) {
      alert('내용을 입력해주세요.');
      return;
    }
    updatePost(title, content, postId).then((data) => {
      if (!data.isError) {
        alert(data.message);
      }
    });
  };

  const handlePostDelete = (postId: string) => {
    if (!postId) {
      alert('존재하지 않는 게시글입니다.');
      return;
    }

    deletePost(postId).then((data) => {
      if (!data.isError) {
        alert(data.message);
      }
    });
  };

  useEffect(() => {
    if (!QuillRef.current) return;

    if (postId) {
      getPostData(postId).then((data) => {
        const post = data.post;
        setTitle(post.title || '');
        setContent(post.content || '');

        if (post.title && post.content) {
          setIsVaild(true);
        }
      });
      return;
    }
  }, [postId]);

  return (
    <div className="w-screen flex justify-center items-center py-20">
      <div className="max-w-3xl">
        <h1 className="text-center text-2xl font-bold pb-12">
          {postId ? '게시글 수정' : '게시글 작성'}
        </h1>

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

        {postId ? (
          <div className="flex gap-10 mt-20 justify-between">
            <BaseButton onClick={() => navigator('/')}>목록으로</BaseButton>

            <div className="flex gap-10">
              <BaseButton onClick={() => handlePostUpdate(postId)}>
                수정하기
              </BaseButton>
              <BaseButton onClick={() => handlePostDelete(postId)}>
                삭제하기
              </BaseButton>
            </div>
          </div>
        ) : (
          <div className="flex justify-end gap-10 mt-20">
            <BaseButton onClick={() => navigator('/')}>목록으로</BaseButton>
            <BaseButton onClick={handlePostCreate}>등록하기</BaseButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
