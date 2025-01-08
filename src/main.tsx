import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import CreatePostPage from './pages/CreatePostPage.tsx';
import MainPage from './pages/MainPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import EmailOtpPage from './pages/EmailOtpPage.tsx';
import SigninPage from './pages/SigninPage.tsx';
import PasswordResetPage from './pages/PasswordResetPage.tsx';
import CreateBoardPage from './pages/CreateBoardPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import ProfileUpdatePage from './pages/ProfileUpdatePage.tsx';
import UpdatePostPage from './pages/UpdatePostPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/signin',
        element: <SigninPage />,
      },
      {
        path: '/signup/otp/verify',
        element: <EmailOtpPage />,
      },
      {
        path: '/password-reset/otp',
        element: <PasswordResetPage />,
      },
      {
        path: '/createpost',
        element: <CreatePostPage />,
      },
      {
        path: '/updatepost',
        element: <UpdatePostPage />,
      },
      {
        path: '/create',
        element: <CreateBoardPage />,
      },
      {
        path: '/:email',
        element: <ProfilePage />,
      },
      {
        path: '/:email/profile',
        element: <ProfileUpdatePage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
