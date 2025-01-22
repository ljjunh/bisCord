export const ROUTES = {
  ROOT: '/',
  AUTH: {
    SIGN_IN: '/signin',
    SIGN_UP: '/signup',
    CALLBACK: '/auth/callback',
  },
  CHAT: {
    DIRECT_MESSAGE: { ROOT: '/directmessage/:id', DETAIL: (id: number) => `/directmessage/${id}` },
    SERVER: {
      ROOT: '/server/:serverId/*',
      DETAIL: (id?: string | null) => `/server/${id}`,
      CHANNEL: (serverId: string, channelId: string) => `/server/${serverId}/${channelId}`,
    },
  },
  NOT_FOUND: '*',
};
