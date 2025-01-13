import { AspectRatio, Textarea } from 'blahblah-front-common-ui-kit';
import { ChangeEvent, useEffect, useState, useRef } from 'react';
import { defaultCommentType } from '../../pages/PostViewPage';
import { deleteComment, updateComment } from '../../apis/comment.api';
import BaseButton from '../Button/BaseButton';

const PostComment = ({ comment }: { comment: defaultCommentType }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const overflowTextRef = useRef<HTMLParagraphElement[] | null[]>([]);

  const handleCommentInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleCommentDelete = async (commentId: string) => {
    if (!commentId) {
      alert('존재하지 않는 댓글입니다.');
      return;
    }

    const response = await deleteComment(commentId);

    if (response && response.isConfirmed) {
      if (!response.data.isError) {
        alert(response.data.message);
      }
    }
  };

  const handleCommentUpdate = async (commentId: string) => {
    if (!commentId) {
      alert('존재하지 않는 댓글입니다.');
      return;
    }

    const data = await updateComment(commentId, content);

    if (!data.isError) {
      alert(data.message);
      setIsEdit(false);
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
    if (!overflowTextRef.current) {
      return;
    }

    window.addEventListener('resize', handleOverflowText);

    return () => {
      window.removeEventListener('resize', handleOverflowText);
    };
  }, []);

  return (
    <div className="py-5">
      <div className="bg-white p-5">
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
              <p
                ref={(el) => (overflowTextRef.current[0] = el)}
                className="basis-[100px] shrink-0 max-768:text-sm max-768:overflow-hidden max-768:text-ellipsis md:overflow-x-scroll md:text-lg text-nowrap"
              >
                {comment ? comment.creator.nickname : '닉네임'}
              </p>
              <p
                ref={(el) => (overflowTextRef.current[1] = el)}
                className="basis-[100px] shrink-0 max-768:text-sm max-768:overflow-hidden max-768:text-ellipsis md:overflow-x-scroll md:text-lg text-nowrap text-slate-300"
              >
                {comment ? comment.createdAt.split('T')[0] : '2024-12-31'}
              </p>
            </div>
          </div>

          <div className="flex gap-2 basis-[100px] justify-end">
            <button
              className="text-sm text-green-500 text-nowrap"
              onClick={() => {
                setIsEdit(true);
                setContent(comment.content);
              }}
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
              value={content}
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
