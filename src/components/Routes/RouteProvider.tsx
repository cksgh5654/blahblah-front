import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import { useEffect } from "react";
import { getSigninStatus } from "../../apis/auth.api";
import BaseLayout from "@components/BaseLayout";
import {
  MainPage,
  SignupPage,
  SigninPage,
  EmailOtpPage,
  PasswordResetPage,
  PostPage,
  CreateBoardPage,
  ProfilePage,
  ProfileUpdatePage,
  BoardDashBoardPage,
} from "@pages/index";

const router = createBrowserRouter([
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

  return <RouterProvider router={router} />;
};

export default RouteProvider;
