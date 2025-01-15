import { AspectRatio, Textarea } from 'blahblah-front-common-ui-kit';
import userIcon from '../../public/default-user-icon.svg';
import { ChangeEvent, useEffect, useState } from 'react';
import { checkAuthor, deletePost, getPostData } from '../apis/post.api';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import BaseButton from '../components/Button/BaseButton';
import { createComment, getComments } from '../apis/comment.api';
import PostComment from '../components/Comment/PostComment';
import '../styles/quill.snow.css';

type defaultPostType = {
  _id: string;
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

const PostViewPage = () => {
  const navigator = useNavigate();
  const { postId = '' } = useParams();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [postData, setPostData] = useState<defaultPostType>();
  const [commentData, setCommentData] = useState([]);
  const [comment, setComment] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  const handleCommentInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handlePostDelete = async (postId: string) => {
    try {
      await checkAuthor(postId);
      const response = await deletePost(postId);

      if (!response.isError) {
        navigator(`/board/${url}`, { replace: true });
      }
    } catch (err) {
      console.error(`[handlePostDelete] : ${err}`);
    }
  };

  const handlePostUpdate = async (postId: string) => {
    try {
      const response = await checkAuthor(postId);

      if (!response.isError) {
        navigator(`/post/detail/${postId}`);
      }
    } catch (err) {
      console.error(`[handlePostUpdate] : ${err}`);
    }
  };

  const handleGetPost = async (postId: string) => {
    try {
      const response = await getPostData(postId);

      const post = response.post;
      setUrl(post.board.url);

      const getdata = {
        _id: post.creator._id,
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
      if (!url) {
        navigator(`/`, { replace: true });
        return;
      }
      navigator(`/board/${url}`, { replace: true });
    }
  };

  const handleCommentCreate = async (postId: string) => {
    try {
      const response = await createComment(postId, comment);
      if (!response.isError) {
        handleGetComments(postId);
        return;
      }
    } catch (err) {
      console.error(`[handleCommentCreate] : ${err}`);
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

  const handleCheck = async (postId: string) => {
    const { IsAuthor } = await checkAuthor(postId);
    setIsOwner(IsAuthor);
  };

  useEffect(() => {
    if (postId) {
      handleGetPost(postId);
      handleCheck(postId);
      return;
    }
  }, []);

  return (
    <div className="min-w-[360px] max-w-[1280px] mx-auto py-20 bg-gray-100">
      <h1 className="text-center text-2xl font-bold py-5">게시글 보기</h1>

      <div className="p-5 ql-editor">
        <div className="bg-white px-10 py-5">
          <div className="flex justify-between gap-5">
            <p className="max-768:text-2xl max-768:text-nowrap overflow-hidden text-ellipsis md:text-3xl font-bold">
              {postData ? postData.title : '제목'}
            </p>
            {isOwner ? (
              <div className="flex gap-2">
                <button
                  className="text-lg text-green-500 text-nowrap"
                  onClick={() => handlePostUpdate(postId)}
                >
                  수정
                </button>
                <button
                  className="text-lg text-green-500 text-nowrap"
                  onClick={() => handlePostDelete(postId)}
                >
                  삭제
                </button>
              </div>
            ) : null}
          </div>
          <div className="pt-5">
            <div className="w-14 bg-gray-100 p-2 rounded-[15px]">
              <AspectRatio ratio={1 / 1}>
                <AspectRatio.Image
                  className="w-full h-full rounded-md"
                  src={postData && postData.image ? postData.image : userIcon}
                  alt="프로필 이미지"
                />
              </AspectRatio>
            </div>

            <div className="flex gap-5 py-2">
              <p className="max-768:text-lg max-768:text-nowrap overflow-hidden text-ellipsis md:text-lg">
                {postData ? postData.nickname : '닉네임'}
              </p>
              <p className="max-768:text-lg max-768:text-nowrap overflow-hidden text-ellipsis md:text-lg text-slate-300">
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

        <div className="flex justify-end mt-5">
          <BaseButton onClick={() => navigator(`/board/${url}`)}>
            목록으로
          </BaseButton>
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
            <div className="flex justify-end py-2">
              <BaseButton
                className="text-sm"
                onClick={() => {
                  handleCommentCreate(postId);
                  setComment('');
                }}
              >
                댓글 등록
              </BaseButton>
            </div>
          </div>
        </div>
        <p className="h-[2px] w-full bg-slate-200 mt-5" />

        {commentData
          ? commentData.map((comment, index) => (
              <PostComment
                key={index}
                comment={comment}
                onCommentChange={handleGetComments}
                postId={postId}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default PostViewPage;
