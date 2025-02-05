import { create } from 'zustand';

interface UnreadUserInfo {
  hasUnread: boolean;
  profileImage: string | null;
  unreadCount: number;
}

interface UnreadMessagesState {
  unreadUsers: Record<number, UnreadUserInfo>;
  addUnreadUser: (userId: number, profileImage: string | null) => void;
  increaseUnreadCount: (userId: number) => void;
  removeUnreadUser: (userId: number) => void;
}

export const useUnreadMessagesStore = create<UnreadMessagesState>((set) => ({
  unreadUsers: {},

  addUnreadUser: (userId, profileImage) =>
    set((state) => ({
      unreadUsers: {
        ...state.unreadUsers,
        [userId]: { hasUnread: true, profileImage, unreadCount: 1 },
      },
    })),

  increaseUnreadCount: (userId) =>
    set((state) => ({
      unreadUsers: {
        ...state.unreadUsers,
        [userId]: {
          ...state.unreadUsers[userId],
          unreadCount: (state.unreadUsers[userId].unreadCount || 0) + 1,
        },
      },
    })),

  removeUnreadUser: (userId) =>
    set((state) => {
      const newUnreadUsers = { ...state.unreadUsers };
      delete newUnreadUsers[userId];
      return { unreadUsers: newUnreadUsers };
    }),
}));
