import { create } from 'zustand';
import { MODAL } from '../../constants/modal';

export interface ModalStore {
  type: keyof typeof MODAL;
  onOpenModal: (type: keyof typeof MODAL) => void;
  onCloseModal: () => void;
}

export const useModalStore = create<ModalStore>()((set) => ({
  type: 'NONE',
  onOpenModal: (type) => set(() => ({ type })),
  onCloseModal: () => set(() => ({ type: 'NONE' })),
}));
