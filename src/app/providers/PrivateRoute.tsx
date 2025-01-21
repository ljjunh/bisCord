import { ROUTES } from '@/shared/constants/routes';
import { useAuthStore } from '@/shared/model/authStore';
import Layout from '@/widgets/components/Layout';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.AUTH.SIGN_IN}
        replace
      />
    );
  }

  return <Layout />;
};
