import { authService } from '../api/service';
import { userService } from '@/entities/user/api/service';
import { useAuthStore } from '@/shared/model/authStore';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export const OAuthCallback = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      handleOAuthCode(code);
    }
  }, [searchParams]);

  const handleOAuthCode = async (code: string) => {
    try {
      const token = await authService.socialSignIn(code);

      useAuthStore.getState().setInitialAuth(token);
      const user = await userService.getUser();

      useAuthStore.getState().setCompleteAuth(token, user);
    } catch (error) {
      console.log(error);
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
