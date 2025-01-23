export const LOGIN_STATUS = {
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
  BUSY: 'BUSY',
  AWAY: 'AWAY',
} as const;

export const LOGIN_STATUS_LABEL = {
  ONLINE: '온라인',
  AWAY: '자리 비움',
  BUSY: '방해 금지',
  OFFLINE: '오프라인',
} as const;
