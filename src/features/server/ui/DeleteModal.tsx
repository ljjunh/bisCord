import ModalContainer from '@/shared/ui/layout/ModalContainer';
import { FormType, MODAL_FORM_DEFAULT_VALUES, useModalForm } from '../useModalForm';
import { ModalForm } from './form';

// import { ReactNode } from 'react';

interface IModalProps {
  handleModal: () => void;
  isModalOpen: boolean;
  serverId: string;
  getServerData: string | undefined;
}

const DeleteModal = ({ handleModal, isModalOpen, getServerData }: IModalProps) => {
  const methods = useModalForm({ defaultValues: MODAL_FORM_DEFAULT_VALUES });

  // 모달 submit
  const onSubmit = (data: FormType) => {
    console.log(data);
  };

  return (
    <ModalContainer
      isOpen={isModalOpen}
      onRequestClose={handleModal}
      title={`${getServerData} 서버 삭제`}
      description=""
    >
      <ModalForm
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <ModalForm.Input
          name="server"
          label="서버 이름을 입력하세요"
        />
        <div className="w-full self-end bg-dark-gray p-4">
          <button
            type="submit"
            className="w-full rounded-md bg-gray p-2 transition-colors hover:bg-blue"
          >
            {/* {isPending ? '채널을 생성중입니다' : '생성하기'} */}
          </button>
        </div>
      </ModalForm>
    </ModalContainer>
  );
};

export default DeleteModal;
