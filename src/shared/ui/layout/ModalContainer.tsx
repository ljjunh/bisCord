import ReactModal from 'react-modal';
import { PropsWithChildren } from 'react';
import CloseIcon from '@/shared/icons/CloseIcon';

interface ModalContainer extends PropsWithChildren {
  isOpen: boolean;
  title?: string;
  subTitle?: string;
  description: string;
  onClose: () => void;
  className?: string;
}

const ModalContainer = ({
  isOpen,
  title,
  description,
  children,
  onClose,
  subTitle,
}: ModalContainer) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false} // 이 옵션은 테스트 또는 개발 중에만 사용하세요.
      overlayClassName="fixed inset-0 bg-[#000] bg-opacity-60 flex justify-center items-center"
      className="relative flex w-full max-w-md flex-col items-center gap-4 overflow-hidden rounded-lg bg-gray pt-4 text-center text-white shadow-lg outline-none"
    >
      <div
        className="absolute right-4 top-4 cursor-pointer"
        // onClick={onRequestClose}
        onClick={onClose}
      >
        <CloseIcon size={15} />
      </div>
      <div className="w-full px-4">
        {title && <h2 className="text-2xl font-bold">{title}</h2>}
        {subTitle && <h2 className="text-start text-xl font-bold">{subTitle}</h2>}
        <p className="mt-2 text-light-gray">{description}</p>
      </div>
      {children}
    </ReactModal>
  );
};

export default ModalContainer;
