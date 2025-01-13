export const path = {
  home: '/',
  signin: '/signin',
  signup: '/signup',
  directmessage: '/directmessage',
  server: '/server/:serverId',
  server_id: (id?: number) => (id ? `/server/${id}` : `/server`),
  channel_id: (serverId: number, channelId?: number) =>
    channelId ? `/server/${serverId}/channelId=${channelId}` : `/server/${serverId}`,

  notFound: '*',
};
