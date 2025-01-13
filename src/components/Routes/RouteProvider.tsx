import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import BaseLayout from "@components/BaseLayout";
import {
  MainPage,
  SignupPage,
  SigninPage,
  EmailOtpPage,
  PasswordResetPage,
  CreateBoardPage,
  ProfilePage,
  ProfileUpdatePage,
  BoardDashBoardPage,
  CreatePostPage,
  UpdatePostPage,
} from "@pages/index";
import { useUserContext } from "@context/userContext";
import { getSigninStatus } from "@apis/auth.api";
import BoardPage from "@pages/BoardPage";
import PostViewPage from "@pages/PostViewPage";
import ErrorPage from "@pages/ErrorPage";
import { boardDashBoardLoader, profileLoader, userLoader } from "./routeLoader";
import UnauthorizedErrorPage from "@pages/UnauthorizedErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminPage from "@pages/AdminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    errorElement: <ErrorPage />,
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
        path: "/post/create/:url",
        element: <CreatePostPage />,
      },
      {
        path: "/post/detail/:postId",
        element: <UpdatePostPage />,
      },
      {
        path: "/post/view/:postId",
        element: <PostViewPage />,
      },
      {
        path: "/create-board",
        element: <CreateBoardPage />,
      },
      {
        path: "/board/:url",
        element: <BoardPage />,
      },
      {
        path: "/:email",
        element: <ProfilePage />,
        loader: profileLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/:email/profile",
        element: (
          <ProtectedRoute>
            <ProfileUpdatePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/board/dashboard/:boardId",
        element: <BoardDashBoardPage />,
        loader: boardDashBoardLoader,
        errorElement: <UnauthorizedErrorPage />,
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute requiredRole="ADMIN">
            <AdminPage />
          </ProtectedRoute>
        ),
        // errorElement: <UnauthorizedErrorPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const RouteProvider = () => {
  return <RouterProvider router={router} />;
};

export default RouteProvider;
