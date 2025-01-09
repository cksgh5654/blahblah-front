import ReactQuillNew, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { ImageResize } from 'quill-image-resize-module-ts';
import { ChangeEvent, useState, useMemo, useRef, useEffect } from 'react';
import BaseInput from '../components/Input/BaseInput';
import BaseButton from '../components/Button/BaseButton';
import { useNavigate, useParams } from 'react-router-dom';
import { imageUpload } from '../config/aws.config';
import { PostTitleValidation } from '../utils/validation';
import {
  getPostData,
  handlePostCreate,
  handlePostDelete,
  handlePostUpdate,
} from '../apis/post.api';

Quill.register('modules/ImageResize', ImageResize);

const PostPage = () => {
  const navigator = useNavigate();

  const {
    boardId = '677e83b45e306601cbb21bb1',
    postId = '677e9d96f28c4c6603555b14',
  } = useParams();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isVaild, setIsVaild] = useState<boolean>(false);
  const QuillRef = useRef<ReactQuillNew>(null);

  const postData = {
    boardId,
    title,
    content,
  };

  const triggerHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('multiple', 'multiple');
    input.addEventListener('change', imageHandler);
    input.click();
  };

  const imageHandler = async (e: Event) => {
    const changeEvent = e as unknown as ChangeEvent<HTMLInputElement>;

    const files = changeEvent.target.files;
    if (!files) {
      return;
    }

    if (!QuillRef.current) {
      return;
    }
    const editor = QuillRef.current.getEditor();
    const range = editor.getSelection();

    if (!range) {
      return;
    }

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageURL = await imageUpload(file);
        editor.insertEmbed(range.index, 'image', imageURL);
        editor.setSelection(range.index + 1);
      }
    } catch (err) {
      console.log('사진 업로드 실패', err);
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline'],
          [{ align: '' }, { align: 'center' }, { align: 'right' }],
          [{ indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [
            {
              color: [],
            },
            { background: [] },
          ],
        ],
        handlers: {
          image: triggerHandler,
        },
      },
      ImageResize: {
        modules: ['Resize'],
      },
    }),
    []
  );

  const handleTitleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleQuillInput = (value: string) => {
    setContent(value);
  };

  const handleValidationChange = (result: boolean) => {
    setIsVaild(result);
  };

  useEffect(() => {
    if (!QuillRef.current) return;

    if (postId) {
      getPostData(postId).then((data) => {
        const post = data.post;
        setTitle(post.title || '');
        setContent(post.content || '');
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
          <ReactQuillNew
            style={{ height: '600px' }}
            ref={QuillRef}
            placeholder="내용을 입력해주세요."
            theme={'snow'}
            modules={modules}
            value={content}
            onChange={handleQuillInput}
          />
        </div>

        {postId ? (
          <div className="flex gap-10 mt-20 justify-between">
            <BaseButton onClick={() => navigator('/')}>목록으로</BaseButton>

            <div className="flex gap-10">
              <BaseButton
                onClick={() => handlePostUpdate(postData, isVaild, postId)}
              >
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
            <BaseButton onClick={() => handlePostCreate(postData, isVaild)}>
              등록하기
            </BaseButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
