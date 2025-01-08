import ReactQuillNew, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { ImageResize } from 'quill-image-resize-module-ts';
import { ChangeEvent, useState, useMemo, useRef, useEffect } from 'react';
import BaseInput from '../components/Input/BaseInput';
import BaseButton from '../components/Button/BaseButton';
import { useNavigate } from 'react-router-dom';
import { imageUpload } from '../config/aws.config';
import { baseInstance } from '../apis/axios.config';
import { PostTitleValidation } from '../utils/validation';

Quill.register('modules/ImageResize', ImageResize);

// const dummycontent = `<p>더미 데이터 생성용 1</p><p><br></p><p><img src="https://elice-project-blahblah.s3.ap-northeast-2.amazonaws.com/images/1736322113955-add_meeing.png" style="" width="271"></p><p><br></p><p>더미 데이터 생성용 2</p><p><br></p><p><img src="https://elice-project-blahblah.s3.ap-northeast-2.amazonaws.com/images/1736322142650-reserve_meeting.png" style="" width="268"></p><p><br></p><p><br></p><p>더미 데이터 생성용 3</p><p><br></p><p><img src="https://elice-project-blahblah.s3.ap-northeast-2.amazonaws.com/images/1736322156081-default_image.png" style="cursor: nesw-resize;" width="261"></p>`;

const UpdatePostPage = () => {
  const navigator = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isVaild, setIsVaild] = useState<boolean>(false);
  const QuillRef = useRef<ReactQuillNew>(null);

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

  const boardSubmit = async () => {
    if (!content) {
      alert('내용을 입력해주세요.');
      return;
    }

    console.log(content);

    if (!isVaild) {
      return;
    }

    const postData = {
      board: '1',
      title,
      content,
    };

    try {
      const response = await baseInstance.post('/post/create', postData);

      if (response.data.isError) {
        throw new Error(response.data.message);
      }

      alert(response.data.message);
      navigator('/');
    } catch (err) {
      console.error(err);
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

        <div className="flex justify-end gap-10 mt-20">
          <BaseButton onClick={() => navigator('/')}>목록으로</BaseButton>
          <BaseButton onClick={boardSubmit}>수정하기</BaseButton>
        </div>
      </div>
    </div>
  );
};

export default UpdatePostPage;
