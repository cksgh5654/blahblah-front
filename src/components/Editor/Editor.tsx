import ReactQuillNew, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { ImageResize } from 'quill-image-resize-module-ts';
import { imageUpload } from '@config/aws.config';
import {
  useMemo,
  ChangeEvent,
  RefObject,
  Dispatch,
  SetStateAction,
} from 'react';

Quill.register('modules/ImageResize', ImageResize);

interface EditorProps {
  QuillRef: RefObject<ReactQuillNew>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  height?: string;
}

const Editor = (props: EditorProps) => {
  const { QuillRef, content, setContent, height = '600px' } = props;

  const handleQuillInput = (value: string) => {
    setContent(value);
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

        const img = editor.root.querySelectorAll('img');
        const insertedImage = img[img.length - 1];
        insertedImage.style.position = 'relative';
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

  return (
    <ReactQuillNew
      style={{ height }}
      ref={QuillRef}
      placeholder="내용을 입력해주세요."
      theme={'snow'}
      modules={modules}
      value={content}
      onChange={handleQuillInput}
    />
  );
};

export default Editor;
