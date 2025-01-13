import type { LoaderFunction } from "react-router-dom";
import { getBoardById, getBoards } from "@apis/board.api";
import { getUserInfo, getUsers } from "@apis/user.api";
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

export const AdminPageLoader: LoaderFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get("page") ?? "1";
  const selectedtab = searchParams.get("selectedTab") ?? "BOARD";
  return selectedtab === "BOARD" ? await getBoards(page) : await getUsers(page);
};
