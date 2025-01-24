import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ROUTES } from '@/shared/constants/routes';
import { authQueries } from '../api/queries';
import { AUTH_FORM_STYLES } from '../model/constants';
import { type SignInFormData, signInSchema } from '../model/schema';

export const SignInForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
  });

  const { mutate, isPending } = useMutation({
    ...authQueries.signIn,
    onSuccess: () => {
      toast.success('로그인 되었습니다');
      navigate(ROUTES.ROOT);
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    mutate(data);
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
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => (
            <p
              id="email-error"
              role="alert"
              className={AUTH_FORM_STYLES.errorMessage}
            >
              {message}
            </p>
          )}
        />
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
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => (
            <p
              id="password-error"
              role="alert"
              className={AUTH_FORM_STYLES.errorMessage}
            >
              {message}
            </p>
          )}
        />
      </div>

      <div className="mb-6 mt-2">
        {/** 비밀번호 찾기 기능 할지 안할지 미정 */}
        <Link
          to="/forgotPassword"
          className="text-sm text-sky-blue hover:underline"
        >
          비밀번호를 잊으셨나요?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isPending || !isValid}
        className="w-full rounded bg-blue-purple p-3 font-medium text-white hover:bg-blue disabled:cursor-not-allowed disabled:opacity-50"
      >
        로그인
      </button>

      <p className="mb-6 text-sm text-super-light-gray">
        계정이 필요하신가요?{' '}
        <Link
          to={ROUTES.AUTH.SIGN_UP}
          className="text-sky-blue hover:underline"
        >
          가입하기
        </Link>
      </p>
    </form>
  );
};
