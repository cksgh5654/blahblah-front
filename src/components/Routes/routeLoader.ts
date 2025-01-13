import { getBoardById } from "@apis/board.api";
import { getUserInfo } from "@apis/user.api";
import type { Params } from "react-router-dom";

export const profileLoader = async ({
  params,
}: {
  params: Params<"email">;
}) => {
  const { email } = params;
  if (!email) throw new Error("email is undefined");
  const response = await getUserInfo(email);
  return response;
};

export const boardDashBoardLoader = async ({
  params,
}: {
  params: Params<"boardId">;
}) => {
  const { boardId } = params;
  if (!boardId) throw new Error("boardId is undefined");
  const response = await getBoardById(boardId);
  return response;
};
