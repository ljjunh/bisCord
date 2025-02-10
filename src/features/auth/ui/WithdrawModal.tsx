import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/model/store/authStore';
import { useModalStore } from '@/shared/model/store/modalStore';
import { useSocketStore } from '@/shared/model/store/socketStore';
import { MODAL } from '@/shared/constants/modal';
import { ROUTES } from '@/shared/constants/routes';
import { ModalContainer } from '@/shared/ui/layout/ModalContainer';
import { authQueries } from '../api/queries';
import { type WithdrawFormData, withdrawSchema } from '../model/schema';

export const WithdrawModal = () => {
  const { type, onCloseModal } = useModalStore((state) => state);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<WithdrawFormData>({
    resolver: zodResolver(withdrawSchema),
    mode: 'onChange',
  });

  const { mutate, isPending } = useMutation({
    ...authQueries.withdraw,
    onSuccess: () => {
      const disconnect = useSocketStore.getState().disconnect;
      disconnect();
      clearAuth();
      window.location.href = ROUTES.AUTH.SIGN_IN;
    },
  });

  const onSubmit = () => {
    mutate();
  };

  return (
    <ModalContainer
      isOpen={type === MODAL.USER_WITHDRAW}
      onClose={onCloseModal}
      title="회원 탈퇴"
      description=""
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 pb-4"
      >
        <span className="text-sm">"회원탈퇴"를 입력해주세요</span>
        <div className="space-y-2">
          <input
            {...register('confirmText')}
            placeholder="회원탈퇴"
            type="text"
            aria-required
            aria-invalid={errors.confirmText ? 'true' : 'false'}
            className="rounded bg-mid-gray p-2 focus:outline-none"
          />
          <ErrorMessage
            errors={errors}
            name="confirmText"
            render={({ message }) => <p className="text-sm text-red">{message}</p>}
          />
        </div>
        <button
          type="button"
          onClick={onCloseModal}
          className="mr-2 rounded bg-dark-gray px-3 py-1.5"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={!isValid || isPending}
          className="rounded bg-red px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          탈퇴
        </button>
      </form>
    </ModalContainer>
  );
};
