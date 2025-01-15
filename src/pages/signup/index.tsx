import { SignUpForm } from '@/features/auth/ui/SignUpForm';
import { AuthLayout } from '@/widgets/layout/ui/AuthLayout';

const SignupPage = () => {
  return (
    <AuthLayout title="계정 만들기">
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignupPage;
