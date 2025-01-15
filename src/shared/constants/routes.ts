export const ROUTES = {
  ROOT: '/',
  AUTH: {
    SIGN_IN: '/signin',
    SIGN_UP: '/signup',
  },
  CHAT: {
    DIRECT_MESSAGE: '/directmessage',
    SERVER: {
      ROOT: '/server/*',
      DETAIL: (id: number) => `/server/${id}`,
      CHANNEL: (serverId: number, channelId?: number) =>
        channelId ? `/server/${serverId}/channelId=${channelId}` : `/server/${serverId}`,
    },
  },
  NOT_FOUND: '*',
};
