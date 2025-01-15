export const QUERY_KEYS = {
  user: {
    // 나중에 base로 관련 쿼리를 한번에 무효화 하도록
    base: ['user'] as const,
    detail: () => [...QUERY_KEYS.user.base, 'detail'] as const,
  },
};
