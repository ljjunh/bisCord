import { create } from 'zustand';

const MODAL = {
  CREATE_SERVER: 'CREATE_SERVER',
  DELETE_SERVER: 'DELETE_SERVER',
  CREATE_CHANNEL: 'CREATE_CHANNEL',
  DELETE_CHANNEL: 'DELETE_CHANNEL',
  INVIDE_MEMBER: 'INVIDE_MEMBER',
  USER_PROFILE: 'USER_PROFILE',
  USER_SIGNOFF: 'USER_SIGNOFF',
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
