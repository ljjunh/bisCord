import type { FriendTab } from './types';

export const FRIEND_TABS = [
  { id: 'online', label: '온라인' },
  { id: 'all', label: '모두' },
  { id: 'pending', label: '대기 중' },
  { id: 'add', label: '친구 추가하기' },
] as const;

export const FRIEND_REQUEST_TYPE = {
  ACCEPTED: 'ACCEPTED',
  PENDING: 'PENDING',
} as const;

export const EMPTY_STATE_MESSAGES: Record<FriendTab | 'default', string> = {
  online: '온라인 친구가 없습니다.',
  all: '친구가 없습니다.',
  pending: '대기 중인 친구 요청이 없습니다.',
  add: '친구 추가하기',
  default: '아직 친구가 없습니다.',
} as const;
