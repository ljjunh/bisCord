import { AuthLayout } from '@/widgets/layout/ui/AuthLayout';
import { SignInForm } from '@/features/auth/ui/SignInForm';
import { SocialSignInLinks } from '@/features/auth/ui/SocialSignInLinks';
import { SEO_CONFIG } from '@/shared/constants/seo';
import { Seo } from '@/shared/ui/Seo';

export default function SigninPage() {
  return (
    <>
      <Seo
        title={SEO_CONFIG.AUTH.SIGN_IN.title}
        description={SEO_CONFIG.AUTH.SIGN_IN.description}
        url={SEO_CONFIG.AUTH.SIGN_IN.url}
      />
      <AuthLayout
        title="돌아오신 것을 환영해요!"
        subTitle="다시 만나다니 너무 반가워요!"
      >
        <SignInForm />
        <SocialSignInLinks />
      </AuthLayout>
    </>
  );
}
