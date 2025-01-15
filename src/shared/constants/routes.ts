export const ROUTES = {
  ROOT: '/',
  AUTH: {
    SIGN_IN: '/signin',
    SIGN_UP: '/signup',
  },
  CHAT: {
    DIRECT_MESSAGE: { ROOT: '/directmessage/:id', DETAIL: (id: number) => `/directmessage/${id}` },
    SERVER: {
      ROOT: '/server/:serverId',
      DETAIL: (id?: number | null) => `/server/${id}`,
      CHANNEL: (serverId: number, channelId?: number) =>
        channelId ? `/server/${serverId}/channelId=${channelId}` : `/server/${serverId}`,
    },
  },
  NOT_FOUND: '*',
};
