export const path = {
  home: '/',
  signin: '/signin',
  signup: '/signup',
  directmessage: '/directmessage/*',
  server: '/server/*',
  server_id: (id: number) => `/server/${id}`,
  channel_id: (serverId: number, channelId?: number) =>
    channelId ? `/server/${serverId}/${channelId}` : `/server/${serverId}`,
};
