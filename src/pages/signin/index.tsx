import { AuthLayout } from '@/widgets/layout/ui/AuthLayout';
import { SignInForm } from '@/features/auth/ui/SignInForm';
import { SocialSignInLinks } from '@/features/auth/ui/SocialSignInLinks';

export default function SigninPage() {
  return (
    <AuthLayout
      title="돌아오신 것을 환영해요!"
      subTitle="다시 만나다니 너무 반가워요!"
    >
      <SignInForm />
      <SocialSignInLinks />
    </AuthLayout>
  );
}
