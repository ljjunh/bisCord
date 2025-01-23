import ReactModal from 'react-modal';
import { ReactNode } from 'react';
import { useModalStore } from '@/shared/model/modalStore';
import CloseIcon from '@/shared/icons/CloseIcon';

interface ModalContainer {
  title: string;
  description: string;
  children: ReactNode;
  onAfterClose?: () => void;
}

const ModalContainer = ({ title, description, children, onAfterClose }: ModalContainer) => {
  const { type, closeModal } = useModalStore((state) => state);

  const handleClose = () => {
    closeModal();
    onAfterClose?.();
  };

  return (
    <ReactModal
      isOpen={type !== 'NONE'}
      onRequestClose={handleClose}
      overlayClassName="fixed inset-0 bg-[#000] bg-opacity-60 flex justify-center items-center"
      className="relative flex w-full max-w-md flex-col items-center gap-4 overflow-hidden rounded-lg bg-gray pt-4 text-center text-white shadow-lg outline-none"
      ariaHideApp={false} // 이 옵션은 테스트 또는 개발 중에만 사용하세요.
    >
      <div
        className="absolute right-4 top-4 cursor-pointer"
        onClick={handleClose}
      >
        <CloseIcon size={15} />
      </div>
      <div className="px-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2 text-light-gray">{description}</p>
      </div>
      {children}
    </ReactModal>
  );
};

export default ModalContainer;
