import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModalStore } from '@/shared/model/modalStore';
import ModalContainer from '@/shared/ui/layout/ModalContainer';
import { SignOffFormData, signOffSchema } from '../model/schema';

export const SignOffModal = () => {
  const { type, onCloseModal } = useModalStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignOffFormData>({
    resolver: zodResolver(signOffSchema),
    mode: 'onChange',
  });

  const onSubmit = () => {
    console.log('회원탈퇴 클릭');
    // 회원탈퇴 api -> auth초기화 -> 로그인페이지
  };

  return (
    <ModalContainer
      isOpen={type === 'USER_SIGNOFF'}
      onClose={onCloseModal}
      title="회원 탈퇴"
      description=""
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 pb-4"
      >
        <span className="font-bold">"회원탈퇴"</span>를 입력해주세요
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
          disabled={!isValid}
          className="rounded bg-red px-3 py-1.5 disabled:opacity-50"
        >
          탈퇴
        </button>
      </form>
    </ModalContainer>
  );
};
