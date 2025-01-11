import { AspectRatio, Textarea } from 'blahblah-front-common-ui-kit';
import { ChangeEvent, useState } from 'react';
import { defaultCommentType } from '../../pages/PostViewPage';
import { deleteComment, updateComment } from '../../apis/comment.api';
import BaseButton from '../Button/BaseButton';

const PostComment = ({ comment }: { comment: defaultCommentType }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

  const handleCommentInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleCommentDelete = (commentId: string) => {
    if (!commentId) {
      alert('존재하지 않는 댓글입니다.');
      return;
    }

    deleteComment(commentId).then((data) => {
      if (!data.isError) {
        alert(data.message);
      }
    });
  };

  const handleCommentUpdate = (commentId: string) => {
    if (!commentId) {
      alert('존재하지 않는 댓글입니다.');
      return;
    }

    updateComment(commentId, content).then((data) => {
      if (!data.isError) {
        alert(data.message);
      }
    });
  };

  return (
    <div className="p-5">
      <div className="bg-white px-10 py-5">
        <div className="flex justify-between">
          <div>
            <div className="w-10 bg-gray-100 p-2 rounded-[15px]">
              <AspectRatio ratio={1 / 1}>
                <AspectRatio.Image
                  className="w-full h-full rounded-md"
                  src={comment ? comment.creator.image : ''}
                  alt="프로필 이미지"
                />
              </AspectRatio>
            </div>

            <div className="flex gap-5">
              <p className="max-768:text-sm max-768:truncate md:text-lg overflow-auto">
                {comment ? comment.creator.nickname : '닉네임'}
              </p>
              <p className="max-768:text-sm max-768:truncate text-nowrap md:text-lg text-slate-300 overflow-auto">
                {comment ? comment.createdAt.split('T')[0] : '2024-12-31'}
              </p>
            </div>
          </div>

          <div className="flex gap-2 px-2">
            <button
              className="text-sm text-green-500 text-nowrap"
              onClick={() => setIsEdit(true)}
            >
              수정
            </button>
            <button
              className="text-sm text-green-500 text-nowrap"
              onClick={() => handleCommentDelete(comment._id)}
            >
              삭제
            </button>
          </div>
        </div>

        <p className="h-[1px] w-full bg-slate-200 mt-5" />

        {isEdit ? (
          <div className="mt-2">
            <Textarea
              placeholder="댓글을 작성해주세요"
              className="p-2 resize-y w-full rounded-md border"
              name="comment"
              value={content || comment.content}
              onChange={handleCommentInput}
            />
            <div className="flex justify-end gap-2">
              <BaseButton
                className="text-sm "
                onClick={() => {
                  setContent('');
                  setIsEdit(false);
                }}
              >
                취소
              </BaseButton>

              <BaseButton
                className="text-sm "
                onClick={() => handleCommentUpdate(comment._id)}
              >
                댓글 수정
              </BaseButton>
            </div>
          </div>
        ) : (
          <div
            className="py-5"
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
