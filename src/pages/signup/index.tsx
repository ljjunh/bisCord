import { AuthLayout } from '@/widgets/layout/ui/AuthLayout';
import { SignUpForm } from '@/features/auth/ui/SignUpForm';
import { SEO_CONFIG } from '@/shared/model/constants/seo';
import { Seo } from '@/shared/ui/Seo';

const SignupPage = () => {
  return (
    <>
      <Seo
        title={SEO_CONFIG.AUTH.SIGN_UP.title}
        description={SEO_CONFIG.AUTH.SIGN_UP.description}
        url={SEO_CONFIG.AUTH.SIGN_UP.url}
      />
      <AuthLayout title="계정 만들기">
        <SignUpForm />
      </AuthLayout>
    </>
  );
};

export default SignupPage;
