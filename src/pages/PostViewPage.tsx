import { AspectRatio, Textarea } from 'blahblah-front-common-ui-kit';
import userIcon from '../../public/default-user-icon.svg';
import { ChangeEvent, useEffect, useState, useRef } from 'react';
import { deletePost, getPostData } from '../apis/post.api';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import BaseButton from '../components/Button/BaseButton';
import { createComment, getComments } from '../apis/comment.api';
import PostComment from '../components/Comment/PostComment';

type defaultPostType = {
  title: string;
  nickname: string;
  createdAt: string;
  image: string;
  content: string;
};

export type defaultCommentType = {
  _id: string;
  content: string;
  createdAt: string;
  creator: {
    image: string;
    nickname: string;
    _id: string;
  };
};

/***
 * postId가 아무값이 들어왔을 떄 x
 */

const PostViewPage = () => {
  const navigator = useNavigate();
  const { postId = '' } = useParams();

  const [postData, setPostData] = useState<defaultPostType>();
  const [commentData, setCommentData] = useState([]);
  const [comment, setComment] = useState<string>('');
  const overflowTextRef = useRef<HTMLParagraphElement[] | null[]>([]);

  const handleCommentInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handlePostDelete = async (postId: string) => {
    try {
      const response = await deletePost(postId);

      if (!response.isError) {
        alert(response.message);
        navigator('/');
      }
    } catch (err) {
      console.error(`[handlePostDelete] : ${err}`);
    }
  };

  const handleCommentCreate = async (postId: string) => {
    try {
      const response = await createComment(postId, comment);

      if (!response.isError) {
        alert(response.message);
        handleGetComments(postId);
        return;
      }
    } catch (err) {
      console.error(`[handleCommentCreate] : ${err}`);
    }
  };

  const handleGetPost = async (postId: string) => {
    try {
      const response = await getPostData(postId);
      if (!response.post) {
        alert('존재하지 않는 게시글입니다.');
        navigator('/');
        return;
      }

      const post = response.post;

      const getdata = {
        title: post.title,
        nickname: post.creator.nickname,
        createdAt: post.createdAt,
        image: post.creator.image,
        content: post.content,
      };
      setPostData(getdata);
      handleGetComments(postId);
    } catch (err) {
      console.error(`[handleGetPost] : ${err}`);
    }
  };

  const handleGetComments = async (postId: string) => {
    try {
      const response = await getComments(postId);

      const comments = response.comments;

      const filteredComments = comments.map(
        ({ _id, content, createdAt, creator }: defaultCommentType) => ({
          _id,
          content,
          createdAt,
          creator,
        })
      );

      setCommentData(filteredComments);
    } catch (err) {
      console.error(`[handleGetComment] : ${err}`);
    }
  };

  const handleOverflowText = () => {
    overflowTextRef.current.map((element) => {
      if (element) {
        element.scrollLeft = 0;
      }
    });
  };

  useEffect(() => {
    handleGetPost(postId);

    if (!overflowTextRef.current) {
      return;
    }

    window.addEventListener('resize', handleOverflowText);

    return () => {
      window.removeEventListener('resize', handleOverflowText);
    };
  }, [commentData]);

  return (
    <div className="min-w-[360px] max-w-[1280px] mx-auto py-20 bg-gray-100">
      <h1 className="text-center text-xl font-bold">게시글 보기</h1>

      <div className="p-5">
        <div className="bg-white px-10 py-5">
          <div className="flex justify-between">
            <p
              ref={(el) => (overflowTextRef.current[0] = el)}
              className="max-768:text-xl max-768:overflow-hidden max-768:text-ellipsis md:overflow-x-scroll md:text-2xl text-nowrap font-bold"
            >
              {postData ? postData.title : '제목'}
            </p>

            <div className="flex gap-2">
              <button
                className="text-sm text-green-500 text-nowrap"
                onClick={() => navigator(`/post/detail/${postId}`)}
              >
                수정
              </button>
              <button
                className="text-sm text-green-500 text-nowrap"
                onClick={() => handlePostDelete(postId)}
              >
                삭제
              </button>
            </div>
          </div>
          <div className="pt-5">
            <div className="w-10 bg-gray-100 p-2 rounded-[15px]">
              <AspectRatio ratio={1 / 1}>
                <AspectRatio.Image
                  className="w-full h-full rounded-md"
                  src={postData ? postData.image : userIcon}
                  alt="프로필 이미지"
                />
              </AspectRatio>
            </div>

            <div className="flex gap-5">
              <p
                ref={(el) => (overflowTextRef.current[1] = el)}
                className="basis-[120px] shrink-0 max-768:text-sm max-768:overflow-hidden max-768:text-ellipsis md:overflow-x-scroll md:text-lg text-nowrap"
              >
                {postData ? postData.nickname : '닉네임'}
              </p>
              <p
                ref={(el) => (overflowTextRef.current[2] = el)}
                className="basis-[120px] shrink-0 max-768:text-sm max-768:overflow-hidden max-768:text-ellipsis md:overflow-x-scroll md:text-lg text-nowrap text-slate-300"
              >
                {postData ? postData.createdAt.split('T')[0] : '2024-12-31'}
              </p>
            </div>
          </div>
          <p className="h-[1px] w-full bg-slate-200 mt-5" />
          <div
            className="p-5"
            style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: postData
                  ? DOMPurify.sanitize(postData.content)
                  : '작성 내용',
              }}
            />
          </div>
        </div>
        <div className="mt-5">
          <p className="text-lg font-semi">
            {commentData ? commentData.length : '0'} 개의 댓글
          </p>

          <div className="mt-2">
            <Textarea
              placeholder="댓글을 작성해주세요"
              className="p-2 resize-y w-full rounded-md border"
              name="comment"
              value={comment}
              onChange={handleCommentInput}
            />
            <div className="flex justify-end">
              <BaseButton
                className="text-sm "
                onClick={() => handleCommentCreate(postId)}
              >
                댓글 등록
              </BaseButton>
            </div>
          </div>
        </div>
        <p className="h-[2px] w-full bg-slate-200 mt-5" />

        {commentData
          ? commentData.map((comment, index) => (
              <PostComment key={index} comment={comment} />
            ))
          : null}
      </div>
    </div>
  );
};

export default PostViewPage;
