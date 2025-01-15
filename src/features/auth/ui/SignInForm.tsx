import { AUTH_FORM_STYLES } from '../model/constants';
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
        <label
          htmlFor="email"
          className={AUTH_FORM_STYLES.label}
        >
          이메일
          <span
            className="text-red"
            aria-hidden="true"
          >
            *
          </span>
          <span className="sr-only">필수 입력</span>
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          autoComplete="email"
          aria-required
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={AUTH_FORM_STYLES.input}
        />
        {errors.email && (
          <p
            id="email-error"
            role="alert"
            className={AUTH_FORM_STYLES.errorMessage}
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className={AUTH_FORM_STYLES.label}
        >
          비밀번호
          <span
            className="text-red"
            aria-hidden="true"
          >
            *
          </span>
          <span className="sr-only">필수 입력</span>
        </label>
        <input
          {...register('password')}
          id="password"
          type="password"
          autoComplete="current-password"
          aria-required
          aria-invalid={errors.password ? 'true' : 'false'}
          aria-describedby={errors.password ? 'password-error' : undefined}
          className={AUTH_FORM_STYLES.input}
        />
        {errors.password && (
          <p
            id="password-error"
            role="alert"
            className={AUTH_FORM_STYLES.errorMessage}
          >
            {errors.password.message}
          </p>
        )}
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
