import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import AuthCallbackPage from '@/pages/auth';
import ChannelPage from '@/pages/channels';
import DirectMessagePage from '@/pages/directMessage';
import MainPage from '@/pages/main';
import NotFound from '@/pages/notFound';
import SigninPage from '@/pages/signin';
import SignupPage from '@/pages/signup';
import { ROUTES } from '@/shared/constants/routes';
import { Route, Routes } from 'react-router-dom';

export const RouterProvider = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path={ROUTES.AUTH.SIGN_IN}
        element={<PublicRoute element={<SigninPage />} />}
      />
      <Route
        path={ROUTES.AUTH.SIGN_UP}
        element={<PublicRoute element={<SignupPage />} />}
      />
      <Route
        path={ROUTES.AUTH.CALLBACK}
        element={<PublicRoute element={<AuthCallbackPage />} />}
      />

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route
          path={ROUTES.ROOT}
          element={<MainPage />}
        />
        <Route
          path={ROUTES.CHAT.DIRECT_MESSAGE.ROOT}
          element={<DirectMessagePage />}
        />
        <Route
          path={ROUTES.CHAT.SERVER.ROOT}
          element={<ChannelPage />}
        />
      </Route>

      {/* NotFound */}
      <Route
        path={ROUTES.NOT_FOUND}
        element={<NotFound />}
      />
    </Routes>
  );
};
