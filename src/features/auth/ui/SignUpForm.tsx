import { AUTH_FORM_STYLES } from '../model/constants';
import { type SignUpFormData, SignUpSchema } from '../model/schema';
import { ROUTES } from '@/shared/constants/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    // TODO : 회원가입 API 호출
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
          htmlFor="username"
          className={AUTH_FORM_STYLES.label}
        >
          사용자명
          <span
            className="text-red"
            aria-hidden="true"
          >
            *
          </span>
          <span className="sr-only">필수 입력</span>
        </label>
        <input
          {...register('username')}
          id="username"
          type="text"
          aria-required
          autoComplete="name"
          aria-invalid={errors.username ? 'true' : 'false'}
          aria-describedby={errors.username ? 'username-error' : undefined}
          className={AUTH_FORM_STYLES.input}
        />
        {errors.username && (
          <p
            id="username-error"
            role="alert"
            className={AUTH_FORM_STYLES.errorMessage}
          >
            {errors.username.message}
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
            aria-hidden
          >
            *
          </span>
          <span className="sr-only">필수 입력</span>
        </label>
        <input
          {...register('password')}
          id="password"
          type="password"
          autoComplete="new-password"
          aria-required
          aria-invalid={errors.password ? 'true' : 'false'}
          aria-describedby={errors.password ? 'password-error' : undefined}
          className={AUTH_FORM_STYLES.input}
        />
        {errors.password && (
          <p
            id="password-error"
            role="alert"
            className="mt-1 text-xs text-red"
          >
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className={AUTH_FORM_STYLES.label}
        >
          비밀번호 확인
          <span
            className="text-red"
            aria-hidden="true"
          >
            *
          </span>
          <span className="sr-only">필수 입력</span>
        </label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          aria-required
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
          className={AUTH_FORM_STYLES.input}
        />
        {errors.confirmPassword && (
          <p
            id="confirm-password-error"
            role="alert"
            className={AUTH_FORM_STYLES.errorMessage}
          >
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-purple w-full rounded p-3 font-medium text-white hover:bg-blue"
      >
        회원가입
      </button>

      <p className="mt-3">
        <Link
          to={ROUTES.AUTH.SIGN_IN}
          className="text-sky-blue text-sm hover:underline"
        >
          이미 계정이 있으신가요?
        </Link>
      </p>
    </form>
  );
};
