import ReactQuillNew from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { ChangeEvent, useState, useMemo, useRef } from 'react';
import BaseInput from '../components/Input/BaseInput';
import BaseButton from '../components/Button/BaseButton';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const srcRegex = /<img[^>]*src\s*=\s*["']?([^"'>]+)["']?[^>]*>/g;

const srcArray: string[] = []; // src
const urlArray: string[] = []; // url

const CreatePostPage = () => {
  const navigator = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const QuillRef = useRef<ReactQuillNew>(null);

  const modules = useMemo(
    () => ({
      ImageActions: {},
      ImageFormats: {},
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

    let match;
    let index = 0;
    let endContent = content;
    const formData = new FormData();

    while ((match = srcRegex.exec(content)) !== null) {
      let result = match[1];
      srcArray.push(result);

      const byteString = atob(result.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ia], {
        type: 'image/jpeg',
      });

      const imagefile = new File([blob], `image-${index}.jpg`);
      formData.append('file[]', imagefile);
      index++;
    }

    try {
      // const response = await axios.post('S3 api', formData, {
      //   headers: {
      //     'Content-type': 'multipart/form-data',
      //   },
      // });
      // if (response.data.success) {
      //   urlArray.push(response.data.urls);
      // }

      const urls = ['1.jpg', '2.jpg', '3.jpg'];
      urlArray.push(...urls);
    } catch (err) {
      console.error(`[getImageUrls] : ${err}`);
    }

    if (srcArray.length > 0) {
      for (let i = 0; i < srcArray.length; i++) {
        let replace = endContent.replace(srcArray[i], urlArray[i]);
        endContent = replace;
      }
    } else {
      endContent = content;
    }

    console.log(urlArray);
    console.log(endContent);

    // const postData = {
    //   boardId,
    //   userId,
    //   title,
    //   content: endContent,
    //   imgList: urlArray,
    // };

    // try {
    //   const createPost = await axios.post('게시글 생성 api', postData);
    // } catch (err) {
    //   console.error(`[] : ${err}`);
    // }
  };

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
