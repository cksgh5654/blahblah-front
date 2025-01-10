// import { AspectRatio } from 'blahblah-front-common-ui-kit';
// import { useEffect, useState } from 'react';

// const PostComment = (commentId: string) => {
//   const [isEdit, setIsEdit] = useState<boolean>(false);

//   const handleCommentDelete = (commentId: string) => {
//     console.log(commentId);
//   };

//   const handleCommentUpdate = (commentId: string) => {
//     console.log(commentId);
//   };

//   useEffect(() => {
//     const data = {};

//     const comment = data.commment;

//     const commentData = {
//       image: comment.creator.image,
//       nickname: comment.creator.nickname,
//       createdAt: comment.createdAt,
//       content: comment.content,
//     };
//   }, []);

//   return (
//     <div className="p-5">
//       <div className="bg-white px-10 py-5">
//         <div className="flex justify-between">
//           <div>
//             <div className="w-10 bg-gray-100 p-2 rounded-[15px]">
//               <AspectRatio ratio={1 / 1}>
//                 <AspectRatio.Image
//                   className="w-full h-full rounded-md"
//                   src={commentData ? commentData.image : ''}
//                   alt="프로필 이미지"
//                 />
//               </AspectRatio>
//             </div>

//             <div className="flex gap-5">
//               <p className="max-768:text-sm max-768:truncate md:text-lg overflow-auto">
//                 {commentData ? commentData.image : ''}
//               </p>
//               <p className="max-768:text-sm max-768:truncate text-nowrap md:text-lg text-slate-300 overflow-auto">
//                 2024-12-31
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-2 px-2">
//             <button
//               className="text-sm text-green-500 text-nowrap"
//               onClick={() => handleCommentUpdate(commentId)}
//             >
//               수정
//             </button>
//             <button
//               className="text-sm text-green-500 text-nowrap"
//               onClick={() => handleCommentDelete(commentId)}
//             >
//               삭제
//             </button>
//           </div>
//         </div>

//         <p className="h-[1px] w-full bg-slate-200 mt-5" />
//         <div
//           className="p-5"
//           style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
//         >
//           {}
//           <div />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostComment;
