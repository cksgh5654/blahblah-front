import { AspectRatio, Textarea } from 'blahblah-front-common-ui-kit';
import { ChangeEvent, useEffect, useState } from 'react';
import { defaultCommentType } from '../../pages/PostViewPage';
import userIcon from '../../../public/default-user-icon.svg';
import {
  deleteComment,
  updateComment,
  checkAuthor,
} from '../../apis/comment.api';
import BaseButton from '../Button/BaseButton';

const PostComment = ({
  comment,
  onCommentChange,
  postId,
}: {
  comment: defaultCommentType;
  onCommentChange: (postId: string) => Promise<void>;
  postId: string;
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

  const handleCommentInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleCommentDelete = async (commentId: string) => {
    if (!commentId) {
      alert('존재하지 않는 댓글입니다.');
      return;
    }
    await checkAuthor(commentId);
    await deleteComment(commentId);
    await onCommentChange(postId);
  };

  const handleCommentUpdate = async (commentId: string) => {
    if (!commentId) {
      alert('존재하지 않는 댓글입니다.');
      return;
    }

    await checkAuthor(commentId);
    const data = await updateComment(commentId, content);
    await onCommentChange(postId);

    if (!data.isError) {
      setIsEdit(false);
    }
  };

  const handleCheck = async (commonId: string) => {
    const { IsAuthor } = await checkAuthor(commonId);
    setIsOwner(IsAuthor);
  };

  useEffect(() => {
    handleCheck(comment._id);
  }, []);

  return (
    <div className="py-5">
      <div className="bg-white p-5">
        <div className="flex justify-between">
          <div className="w-60">
            <div className="w-12 bg-gray-100 p-2 rounded-[15px]">
              <AspectRatio ratio={1 / 1}>
                <AspectRatio.Image
                  className="w-full h-full rounded-md"
                  src={
                    comment && comment.creator.image
                      ? comment.creator.image
                      : userIcon
                  }
                  alt="프로필 이미지"
                />
              </AspectRatio>
            </div>

            <div className="flex gap-5 py-2">
              <p className="basis-[180px] max-768:text-lg max-768:text-nowrap overflow-hidden text-ellipsis md:text-lg">
                {comment ? comment.creator.nickname : '닉네임'}
              </p>
              <p className="basis-[180px] max-768:text-lg max-768:text-nowrap overflow-hidden text-ellipsis md:text-lg text-slate-300">
                {comment ? comment.createdAt.split('T')[0] : '2024-12-31'}
              </p>
            </div>
          </div>
          {isOwner ? (
            <div className="flex gap-2 justify-end">
              <button
                className="text-lg text-green-500 text-nowrap"
                onClick={() => {
                  setIsEdit(true);
                  setContent(comment.content);
                }}
              >
                수정
              </button>
              <button
                className="text-lg text-green-500 text-nowrap"
                onClick={() => handleCommentDelete(comment._id)}
              >
                삭제
              </button>
            </div>
          ) : null}
        </div>

        <p className="h-[1px] w-full bg-slate-200 mt-5" />

        {isEdit ? (
          <div className="mt-2">
            <Textarea
              placeholder="댓글을 작성해주세요"
              className="p-2 resize-y w-full rounded-md border"
              name="comment"
              value={content}
              onChange={handleCommentInput}
            />
            <div className="flex justify-end gap-2">
              <BaseButton
                className="text-sm"
                onClick={() => {
                  setContent('');
                  setIsEdit(false);
                }}
              >
                취소
              </BaseButton>

              <BaseButton
                className="text-sm"
                onClick={() => handleCommentUpdate(comment._id)}
              >
                댓글 수정
              </BaseButton>
            </div>
          </div>
        ) : (
          <div
            className="py-5 text-lg"
            style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
          >
            {comment ? comment.content : '댓글 내용'}
            <div />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostComment;
