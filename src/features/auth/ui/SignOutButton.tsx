import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/model/authStore';
import { ROUTES } from '@/shared/constants/routes';
import { authQueries } from '../api/queries';

export const SignOutButton = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const { mutate } = useMutation({
    ...authQueries.signOut,
    onSuccess: () => {
      clearAuth();
      window.location.href = ROUTES.ROOT;
    },
  });

  return (
    <button
      onClick={() => mutate()}
      className="w-full px-2 py-1 text-left hover:rounded hover:bg-mid-gray hover:text-white"
    >
      로그아웃
    </button>
  );
};
