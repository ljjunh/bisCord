import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useAuthStore } from '@/shared/model/authStore';
import { userService } from '@/entities/user/api/service';
import { ROUTES } from '@/shared/constants/routes';
import { authService } from '../api/service';

export const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      handleOAuthCode(code);
    }
  }, [searchParams]);

  const handleOAuthCode = async (code: string) => {
    try {
      const token = await authService.socialSignIn(code);

      useAuthStore.getState().setAccessToken(token);
      const user = await userService.getUser();

      useAuthStore.getState().setAuth(user);
    } catch {
      toast.error('로그인에 실패했습니다. 다시 시도해주세요.');
      navigate(ROUTES.AUTH.SIGN_IN);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center">
        <div className="animate-avatarHover relative flex h-20 w-20 items-center justify-center rounded-full bg-gray-600">
          <div className="absolute h-16 w-16 animate-ping rounded-full bg-blue-purple"></div>
          <div className="absolute h-12 w-12 rounded-full bg-gray"></div>
        </div>
        <p className="mt-6 text-xl font-semibold text-white">인증 중...</p>
        <p className="mt-2 text-sm text-light-gray">잠시만 기다려 주세요.</p>
      </div>
    </div>
  );
};
