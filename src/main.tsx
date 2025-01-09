import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreatePostPage from "./pages/CreatePostPage.tsx";
import MainPage from "./pages/MainPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import EmailOtpPage from "./pages/EmailOtpPage.tsx";
import SigninPage from "./pages/SigninPage.tsx";
import PasswordResetPage from "./pages/PasswordResetPage.tsx";
import CreateBoardPage from "./pages/CreateBoardPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import ProfileUpdatePage from "./pages/ProfileUpdatePage.tsx";
import UserProvider from "./context/userContext.tsx";
import BoardDashBoardPage from "./pages/BoardDashBoardPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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

createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
