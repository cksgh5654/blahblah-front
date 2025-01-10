import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import SignupPage from "../../pages/SignupPage";
import SigninPage from "../../pages/SigninPage";
import EmailOtpPage from "../../pages/EmailOtpPage";
import PasswordResetPage from "../../pages/PasswordResetPage";
import PostPage from "../../pages/PostPage";
import CreateBoardPage from "../../pages/CreateBoardPage";
import ProfilePage from "../../pages/ProfilePage";
import ProfileUpdatePage from "../../pages/ProfileUpdatePage";
import BoardDashBoardPage from "../../pages/BoardDashBoardPage";
import BaseLayout from "../BaseLayout";
import { useUserContext } from "../../context/userContext";
import { useEffect } from "react";
import { getSigninStatus } from "../../apis/auth.api";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/signin",
        element: <SigninPage />,
      },
      {
        path: "/signup/otp/verify",
        element: <EmailOtpPage />,
      },
      {
        path: "/password-reset/otp",
        element: <PasswordResetPage />,
      },
      {
        path: "/post/create/:boardId",
        element: <PostPage />,
      },
      {
        path: "/post/detail/:postId",
        element: <PostPage />,
      },
      {
        path: "/create",
        element: <CreateBoardPage />,
      },
      {
        path: "/:email",
        element: <ProfilePage />,
      },
      {
        path: "/:email/profile",
        element: <ProfileUpdatePage />,
      },
      {
        path: "/board/dashboard/:boardId",
        element: <BoardDashBoardPage />,
      },
    ],
  },
]);

const RouteProvider = () => {
  const { updateUser } = useUserContext();
  useEffect(() => {
    getSigninStatus() //
      .then(({ user, signinStatus }) => {
        updateUser(user);
        localStorage.signinStatus = signinStatus;
      });
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default RouteProvider;
