import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ROUTES } from '@/shared/model/constants/routes';
import { authQueries } from '../api/queries';

export const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    ...authQueries.socialSignIn,
    onError: () => {
      toast.error('로그인 실패');
      navigate(ROUTES.AUTH.SIGN_IN);
    },
  });

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      mutate({ code });
    }
  }, [searchParams]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <section className="flex flex-col items-center">
        <figure className="animate-avatarHover relative flex h-20 w-20 items-center justify-center rounded-full bg-gray-600">
          <div className="absolute h-16 w-16 animate-ping rounded-full bg-blue-purple"></div>
          <div className="absolute h-12 w-12 rounded-full bg-gray"></div>
        </figure>
        <header className="mt-6">
          <h1 className="text-xl font-semibold text-white">인증 중...</h1>
        </header>
        <p className="mt-2 text-sm text-light-gray">잠시만 기다려 주세요.</p>
      </section>
    </main>
  );
};
