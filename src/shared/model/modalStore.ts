import { create } from 'zustand';

const MODAL = {
  CREATE_SERVER: 'CREATE_SERVER',
  DELEETE_SERVER: 'DELETE_DERVER',
  CREATE_CHANNEL: 'CREATE_CHANNEL',
  NONE: 'NONE',
};

interface ModalStore {
  type: keyof typeof MODAL;
  onOpenModal: (type: keyof typeof MODAL) => void;
  onCloseModal: () => void;
}

export const useModalStore = create<ModalStore>()((set) => ({
  type: 'NONE',
  onOpenModal: (type) => set(() => ({ type })),
  onCloseModal: () => set(() => ({ type: 'NONE' })),
}));
