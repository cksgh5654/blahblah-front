import ReactQuillNew, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { ImageResize } from 'quill-image-resize-module-ts';
import { ChangeEvent, useState, useMemo, useRef, useEffect } from 'react';
import BaseInput from '../components/Input/BaseInput';
import BaseButton from '../components/Button/BaseButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

Quill.register('modules/ImageResize', ImageResize);

const CreatePostPage = () => {
  const navigator = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const QuillRef = useRef<ReactQuillNew>(null);

  const triggerHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('multiple', 'multiple');
    input.addEventListener('change', imageHandler);
    input.classList.add('ql-image');
    input.click();
  };

  const imageHandler = async (e: Event) => {
    const changeEvent = e as unknown as ChangeEvent<HTMLInputElement>;

    const files = changeEvent.target.files;
    console.log(files);
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
        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post('multer api', formData, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        });

        if (response.data.success) {
          const imageURL = response.data.success;

          editor.insertEmbed(range.index, 'image', imageURL);
          editor.setSelection(range.index + 1);
        }
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

  const handleTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleQuillInput = (value: string) => {
    setContent(value);
  };

  const boardSubmit = async () => {
    if (!title) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!content) {
      alert('내용을 입력해주세요.');
      return;
    }

    // const postData = {
    //   boardId,
    //   userId,
    //   title,
    //   content,
    // };

    // try {
    //   const createPost = await axios.post('게시글 생성 api', postData);
    // } catch (err) {
    //   console.error(`[] : ${err}`);
    // }
  };

  useEffect(() => {
    if (!QuillRef.current) return;
  }, []);

  return (
    <div className="w-screen flex justify-center items-center py-20">
      <div className="max-w-3xl">
        <h1 className="text-center text-2xl font-bold pb-12">게시글 작성</h1>

        <div className="pt-10">
          <BaseInput
            withLabel="게시글 제목 (30자 이내)"
            onChange={handleTitleInput}
            value={title}
            maxLength={30}
          />
        </div>

        <div className="pt-10">
          <ReactQuillNew
            style={{ height: '500px' }}
            ref={QuillRef}
            placeholder="내용을 입력해주세요."
            theme={'snow'}
            modules={modules}
            value={content}
            onChange={handleQuillInput}
          />
        </div>

        <div className="flex gap-10 pt-20">
          <BaseButton onClick={() => navigator('/')}>목록으로</BaseButton>
          <BaseButton onClick={boardSubmit}>등록하기</BaseButton>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
