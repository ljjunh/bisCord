import { type SignInFormData, SignInSchema } from '../model/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    // TODO: 로그인 API 호출
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <label className="text-super-light-gray mb-2 block text-xs font-bold">
          이메일 또는 전화번호
          <span className="text-red"> *</span>
        </label>
        <input
          {...register('email')}
          type="email"
          autoComplete="email"
          aria-label="이메일 입력"
          aria-invalid={errors.email ? 'true' : 'false'}
          className="w-full rounded border p-2 focus:outline-none"
        />
        {errors.email && (
          <p
            role="alert"
            className="mt-1 text-xs text-red"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-super-light-gray mb-2 block text-xs font-bold">
          비밀번호
          <span className="text-red"> *</span>
        </label>
        <input
          {...register('password')}
          type="password"
          aria-label="비밀번호 입력"
          aria-invalid={errors.password ? 'true' : 'false'}
          autoComplete="current-password"
          className="w-full rounded border p-2 focus:outline-none"
        />
        {errors.password && <p className="mt-1 text-xs text-red">{errors.password.message}</p>}
      </div>

      <div className="mb-6 mt-2">
        <Link
          to="/forgotPassword"
          className="text-sky-blue text-sm hover:underline"
        >
          비밀번호를 잊으셨나요?
        </Link>
      </div>

      <button
        type="submit"
        className="bg-blue-purple w-full rounded p-3 font-medium text-white hover:bg-blue"
      >
        로그인
      </button>

      <p className="text-super-light-gray mb-6 text-sm">
        계정이 필요하신가요?{' '}
        <Link
          to="/signup"
          className="text-sky-blue hover:underline"
        >
          가입하기
        </Link>
      </p>
    </form>
  );
};
