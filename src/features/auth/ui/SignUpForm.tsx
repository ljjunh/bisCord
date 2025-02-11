import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ROUTES } from '@/shared/model/constants/routes';
import { authQueries } from '../api/queries';
import { AUTH_FORM_STYLES } from '../model/constants';
import { type SignUpFormData, signUpSchema } from '../model/schema';

export const SignUpForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const { mutate, isPending } = useMutation({
    ...authQueries.signUp,
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다');
      navigate(ROUTES.AUTH.SIGN_IN);
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2"
    >
      <div className="space-y-0.5">
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
        <div className="h-[17px] overflow-hidden">
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
      </div>

      <div className="space-y-0.5">
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
          {...register('name')}
          id="name"
          type="text"
          aria-required
          autoComplete="name"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={AUTH_FORM_STYLES.input}
        />
        <div className="h-[17px] overflow-hidden">
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => (
              <p
                id="name-error"
                role="alert"
                className={AUTH_FORM_STYLES.errorMessage}
              >
                {message}
              </p>
            )}
          />
        </div>
      </div>

      <div className="space-y-0.5">
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
        <div className="h-[17px] overflow-hidden">
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <p
                id="password-error"
                role="alert"
                className="mt-1 text-xs text-red"
              >
                {message}
              </p>
            )}
          />
        </div>
      </div>

      <div className="space-y-0.5">
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
          {...register('confirmPassword')}
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          aria-required
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
          className={AUTH_FORM_STYLES.input}
        />
        <div className="h-[17px] overflow-hidden">
          <ErrorMessage
            errors={errors}
            name="confirmPassword"
            render={({ message }) => (
              <p
                id="confirm-password-error"
                role="alert"
                className={AUTH_FORM_STYLES.errorMessage}
              >
                {message}
              </p>
            )}
          />
        </div>
      </div>

      <div className="py-3">
        <button
          type="submit"
          disabled={isPending || !isValid}
          className="w-full rounded bg-blue-purple p-3 font-medium text-white hover:bg-blue disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? '처리중' : '가입하기'}
        </button>

        <p className="mt-3">
          <Link
            to={ROUTES.AUTH.SIGN_IN}
            className="text-sm text-sky-blue hover:underline"
          >
            이미 계정이 있으신가요?
          </Link>
        </p>
      </div>
    </form>
  );
};
