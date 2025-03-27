import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ROUTES } from '@/shared/model/constants/routes';
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
      className="space-y-2"
    >
      <fieldset className="space-y-0.5">
        <legend className="sr-only">로그인 정보</legend>

        <fieldset className="space-y-0.5">
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
            aria-required="true"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={AUTH_FORM_STYLES.input}
          />
          <p className="h-[17px] overflow-hidden">
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <span
                  id="email-error"
                  role="alert"
                  className={AUTH_FORM_STYLES.errorMessage}
                >
                  {message}
                </span>
              )}
            />
          </p>
        </fieldset>

        <fieldset className="space-y-0.5">
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
            aria-required="true"
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className={AUTH_FORM_STYLES.input}
          />
          <p className="h-[17px] overflow-hidden">
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <span
                  id="password-error"
                  role="alert"
                  className={AUTH_FORM_STYLES.errorMessage}
                >
                  {message}
                </span>
              )}
            />
          </p>
        </fieldset>
      </fieldset>

      <nav className="mb-6 mt-2">
        <Link
          to="/forgotPassword"
          className="text-sm text-white hover:underline"
        >
          비밀번호를 잊으셨나요?
        </Link>
      </nav>

      <button
        type="submit"
        disabled={isPending || !isValid}
        className="w-full rounded bg-blue-purple p-3 font-medium text-white hover:bg-blue disabled:cursor-not-allowed disabled:opacity-50"
      >
        로그인
      </button>

      <footer className="mb-6 text-sm text-white">
        계정이 필요하신가요?{' '}
        <Link
          to={ROUTES.AUTH.SIGN_UP}
          className="text-white hover:underline"
        >
          가입하기
        </Link>
      </footer>
    </form>
  );
};
