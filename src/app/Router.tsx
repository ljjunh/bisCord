import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '@/shared/model/authStore';
import AuthCallbackPage from '@/pages/auth';
import ChannelPage from '@/pages/channels';
import DirectMessagePage from '@/pages/directMessage';
import MainPage from '@/pages/main';
import NotFound from '@/pages/notFound';
import SigninPage from '@/pages/signin';
import SignupPage from '@/pages/signup';
import Layout from '@/widgets/components/Layout';
import { ROUTES } from '@/shared/constants/routes';

interface AuthRouteProps {
  isPublic?: boolean;
}

const AuthRoute = ({ isPublic = false }: AuthRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isPublic && !isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.AUTH.SIGN_IN}
        replace
      />
    );
  }

  if (isPublic && isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.ROOT}
        replace
      />
    );
  }

  return isPublic ? <Outlet /> : <Layout />;
};

export const Router = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthRoute isPublic />}>
        <Route
          path={ROUTES.AUTH.SIGN_IN}
          element={<SigninPage />}
        />
        <Route
          path={ROUTES.AUTH.SIGN_UP}
          element={<SignupPage />}
        />
        <Route
          path={ROUTES.AUTH.CALLBACK}
          element={<AuthCallbackPage />}
        />
      </Route>

      {/* Private Routes */}
      <Route element={<AuthRoute />}>
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
