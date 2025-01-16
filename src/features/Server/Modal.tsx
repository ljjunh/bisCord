import { ModalForm } from '@/entities/server/ui/form';
import ReactModal from 'react-modal';

const Modal = () => {
  return (
    <ReactModal isOpen={true}>
      <ModalForm.Input name="server" />
    </ReactModal>
  );
};

export default Modal;
