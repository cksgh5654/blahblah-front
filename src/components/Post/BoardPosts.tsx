import { useEffect, useState } from "react";
import { getBoardPosts } from "../../apis/board.api";
import { Post } from "../../types/post.type";
import { deletePost } from "../../apis/post.api";
interface BoardPostsProps {
  boardId?: string;
}
const BoardPosts = ({ boardId }: BoardPostsProps) => {
  const [posts, setPosts] = useState<Post[]>();

  const handleClickDeletePost = (postId: string) => {
    deletePost(postId) //
      .then(() => {
        const updatedPosts = posts?.filter((post) => post._id !== postId);
        setPosts(updatedPosts);
      });
  };

  useEffect(() => {
    if (!boardId) return;
    getBoardPosts(boardId) //
      .then(setPosts);
  }, []);
  return (
    <>
      <ul>
        {posts?.map((post, index) => (
          <li key={`post-item-${index}`}>
            <img src={post.creator.image} alt="writer-image" />
            <p>{post.title}</p>
            <button
              onClick={() => handleClickDeletePost(post._id)}
              className="bg-red-500"
            >
              게시글 삭제
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BoardPosts;
