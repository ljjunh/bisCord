import { useModalStore } from '@/shared/model/modalStore';
import { MODAL } from '@/shared/constants/modal';

export const WithdrawButton = () => {
  const onOpenModal = useModalStore((state) => state.onOpenModal);

  const handleModal = () => {
    onOpenModal(MODAL.USER_WITHDRAW);
  };

  return (
    <button
      onClick={handleModal}
      className="w-full px-2 py-1 text-left hover:rounded hover:bg-mid-gray hover:text-white"
    >
      회원탈퇴
    </button>
  );
};
