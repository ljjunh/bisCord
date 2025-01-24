import { useModalStore } from '@/shared/model/modalStore';
import ModalContainer from '@/shared/ui/layout/ModalContainer';

const InvitedMemberModal = () => {
  const { type, onCloseModal } = useModalStore((state) => state);

  return (
    <ModalContainer
      isOpen={type === 'INVIDE_MEMBER'}
      onClose={onCloseModal}
      title={`친구를 ... 그룹으로 초대하기`}
      description=""
    ></ModalContainer>
  );
};

export default InvitedMemberModal;
