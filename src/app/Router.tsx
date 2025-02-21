import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useAuthStore } from '@/shared/model/store/authStore';
import AuthCallbackPage from '@/pages/auth';
import ChannelPage from '@/pages/channels';
import MainPage from '@/pages/main';
import Layout from '@/widgets/layout/ui/MainLayout';
import { ROUTES } from '@/shared/model/constants/routes';
import { AuthLayoutSkeleton } from '@/shared/ui/skeleton/AuthLayoutSkeleton';
import { MainLayoutSkeleton } from '@/shared/ui/skeleton/MainLayoutSkeleton';

const SigninPage = lazy(() => import('@/pages/signin'));
const SignupPage = lazy(() => import('@/pages/signup'));
const DirectMessagePage = lazy(() => import('@/pages/directMessage'));
const NotFound = lazy(() => import('@/pages/notFound'));
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
      <Route
        element={
          <Suspense fallback={<AuthLayoutSkeleton />}>
            <AuthRoute isPublic />
          </Suspense>
        }
      >
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
          element={
            <Suspense fallback={<MainLayoutSkeleton />}>
              <DirectMessagePage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.CHAT.SERVER.ROOT}
          element={<ChannelPage />}
        />
      </Route>

      {/* NotFound */}
      <Route
        path={ROUTES.NOT_FOUND}
        element={
          <Suspense fallback={<MainLayoutSkeleton />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
};
