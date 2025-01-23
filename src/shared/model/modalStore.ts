import { create } from 'zustand';

const MODAL = {
  CREATE_SERVER: 'CREATE_SERVER',
  NONE: 'NONE',
};

interface ModalStore {
  type: keyof typeof MODAL;
  openModal: (type: keyof typeof MODAL) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>()((set) => ({
  type: 'NONE',
  openModal: (type) => set(() => ({ type })),
  closeModal: () => set(() => ({ type: 'NONE' })),
}));
