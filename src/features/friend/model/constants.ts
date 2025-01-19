import type { FriendTab } from './types';
import type { Friend } from '@/entities/friend/model/types';

export const FRIEND_TABS = [
  { id: 'online', label: '온라인' },
  { id: 'all', label: '모두' },
  { id: 'pending', label: '대기 중' },
  { id: 'add', label: '친구 추가하기' },
] as const;

export const EMPTY_STATE_MESSAGES: Record<FriendTab | 'default', string> = {
  online: '온라인 친구가 없습니다.',
  all: '친구가 없습니다.',
  pending: '대기 중인 친구 요청이 없습니다.',
  add: '친구 추가하기',
  default: '아직 친구가 없습니다.',
} as const;

export const DUMMY_FRIENDS: Friend[] = [
  {
    id: 1,
    name: '김진영',
    loginStatus: 'LOGOUT',
    status: 'ACCEPTED',
    profileImageURL: 'null',
  },
  {
    id: 2,
    name: '김정현',
    loginStatus: 'LOGOUT',
    status: 'ACCEPTED',
    profileImageURL: 'null',
  },
  {
    id: 3,
    name: '권슬기',
    loginStatus: 'LOGOUT',
    status: 'ACCEPTED',
    profileImageURL: 'null',
  },
  {
    id: 4,
    name: '이해인',
    loginStatus: 'LOGOUT',
    status: 'ACCEPTED',
    profileImageURL: 'null',
  },
  {
    id: 5,
    name: '장인화',
    loginStatus: 'LOGOUT',
    status: 'ACCEPTED',
    profileImageURL: 'null',
  },
  {
    id: 6,
    name: '이종현',
    loginStatus: 'LOGOUT',
    status: 'ACCEPTED',
    profileImageURL: 'null',
  },
  {
    id: 7,
    name: '박경문',
    loginStatus: 'LOGOUT',
    status: 'ACCEPTED',
    profileImageURL: 'null',
  },
  {
    id: 8,
    name: '이동근',
    loginStatus: 'LOGOUT',
    status: 'PENDING',
    profileImageURL: 'null',
  },
  {
    id: 9,
    name: '한설희',
    loginStatus: 'LOGOUT',
    status: 'PENDING',
    profileImageURL: 'null',
  },
  {
    id: 10,
    name: '이명욱',
    loginStatus: 'LOGOUT',
    status: 'PENDING',
    profileImageURL: 'null',
  },
  {
    id: 11,
    name: '윤하연',
    loginStatus: 'LOGOUT',
    status: 'REJECTED',
    profileImageURL: 'null',
  },
  {
    id: 12,
    name: '민준수',
    loginStatus: 'LOGOUT',
    status: 'REJECTED',
    profileImageURL: 'null',
  },
];
