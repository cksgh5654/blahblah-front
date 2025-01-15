import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
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
import BoardPage from "@pages/BoardPage";
import PostViewPage from "@pages/PostViewPage";
import ErrorPage from "@pages/ErrorPage";
import { boardDashBoardLoader, profileLoader } from "./routeLoader";
import UnauthorizedErrorPage from "@pages/UnauthorizedErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminPage from "@pages/AdminPage";
import SearchPage from "@pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/연예" />,
      },
      {
        path: "/:categoryname",
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
        path: "/search/:boardname",
        element: <SearchPage />,
      },
      {
        path: "/profile/:email",
        element: <ProfilePage />,
        loader: profileLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile/:email/update",
        element: (
          <ProtectedRoute requiredRole={["ADMIN", "USER"]}>
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
          <ProtectedRoute requiredRole={["ADMIN"]}>
            <AdminPage />
          </ProtectedRoute>
        ),
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
