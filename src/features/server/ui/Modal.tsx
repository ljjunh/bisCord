import { FormType, MODAL_FORM_DEFAULT_VALUES, useModalForm } from '../useModalForm';
import { ModalForm } from './form';
import CloseIcon from '@/shared/icons/CloseIcon';
import { useServerStore } from '@/shared/model/server/store';
import ReactModal from 'react-modal';

// import { ReactNode } from 'react';

interface IModalProps {
  handleModal: () => void;
  isModalOpen: boolean;
  serverId: string;
  //   children: ReactNode;
}

const Modal = ({ handleModal, isModalOpen, serverId }: IModalProps) => {
  const methods = useModalForm({ defaultValues: MODAL_FORM_DEFAULT_VALUES });
  const addChannel = useServerStore((state) => state.addChannel);

  const onSubmit = (data: FormType) => {
    const newChannel = {
      id: crypto.randomUUID(),
      name: data.channel,
    };

    addChannel(serverId, newChannel);
    methods.reset(); // 폼 초기화
    handleModal();
    console.log('채널 데이터:', data.channel);
  };

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={handleModal}
      overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
      className="relative flex min-h-[400px] w-full max-w-md flex-col items-center gap-4 rounded-lg bg-gray pt-4 text-center text-white shadow-lg outline-none"
    >
      <div
        className="absolute right-4 top-4 cursor-pointer"
        onClick={handleModal}
      >
        <CloseIcon size={15} />
      </div>
      <div className="px-4">
        <h2 className="text-2xl font-bold">채널를 만들어 보세요</h2>
        <p className="mt-2 text-light-gray">
          서버는 나와 친구들이 함께 어울리는 공간입니다. 내 서버를 만들고 대화를 시작해 보세요.
        </p>
      </div>
      {/* {children} */}

      <ModalForm
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <ModalForm.Input
          name="channel"
          label="채널 이름"
        />
        <div className="w-full self-end p-2">
          <button
            type="submit"
            className="w-full rounded-md bg-blue p-2 transition-colors hover:bg-primary"
          >
            생성하기
          </button>
        </div>
      </ModalForm>
    </ReactModal>
  );
};

export default Modal;
