import { useModalStore } from '@/shared/model/modalStore';

export const SignOffButton = () => {
  const onOpenModal = useModalStore((state) => state.onOpenModal);

  const handleModal = () => {
    onOpenModal('USER_SIGNOFF');
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
