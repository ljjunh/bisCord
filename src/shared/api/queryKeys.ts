export const QUERY_KEYS = {
  user: {
    // 나중에 base로 관련 쿼리를 한번에 무효화 하도록
    base: ['user'] as const,
    detail: () => [...QUERY_KEYS.user.base, 'detail'] as const,
    list: (params: object) => [...QUERY_KEYS.user.base, 'list', params],
  },
  server: {
    base: ['server'] as const,
    detail: (params: string) => [...QUERY_KEYS.server.base, 'detail', params] as const,
    list: () => [...QUERY_KEYS.server.base, 'servers'] as const,
  },
  friend: {
    base: ['friend'] as const,
    list: (params: object) => [...QUERY_KEYS.friend.base, 'list', params] as const,
  },
  channel: {
    base: ['channel'] as const,
    detail: (params: string) => [...QUERY_KEYS.channel.base, 'list', params] as const,
    list: () => [...QUERY_KEYS.server.base, 'servers'] as const,
    members: (serverUri: string, channelId: string) =>
      [...QUERY_KEYS.channel.base, 'members', serverUri, channelId] as const, // serverUri와 channelId를 이용한 고유한 키 반환
  },
};
