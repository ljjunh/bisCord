import { ROUTES } from '@/shared/constants/routes';
import { useAuthStore } from '@/shared/model/authStore';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  element: React.ReactNode;
}

export const PublicRoute = ({ element }: PublicRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.ROOT}
        replace
      />
    );
  }

  return <>{element}</>;
};
