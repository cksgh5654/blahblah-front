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
