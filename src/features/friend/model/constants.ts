import { FriendTab } from './types';
import { Friend } from '@/entities/friend/model/types';

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
    status: 'online',
    friendshipStatus: 'accepted',
    profileImageURL: 'null',
    description: 'null',
  },
  {
    id: 2,
    name: '김정현',
    status: 'offline',
    friendshipStatus: 'accepted',
    profileImageURL: 'null',
    description: 'null',
  },
  {
    id: 3,
    name: '권슬기',
    status: 'away',
    friendshipStatus: 'accepted',
    profileImageURL: 'null',
    description: 'null',
  },
  {
    id: 4,
    name: '이해인',
    status: 'online',
    friendshipStatus: 'accepted',
    profileImageURL: 'null',
    description: 'null',
  },
  {
    id: 5,
    name: '장인화',
    status: 'offline',
    friendshipStatus: 'accepted',
    profileImageURL: 'null',
    description: 'null',
  },
  {
    id: 6,
    name: '이종현',
    status: 'away',
    friendshipStatus: 'accepted',
    profileImageURL: 'null',
    description: 'null',
  },
  {
    id: 7,
    name: '박경문',
    status: 'online',
    friendshipStatus: 'accepted',
    profileImageURL: 'null',
    description: 'null',
  },
  {
    id: 8,
    name: '이동근',
    status: 'offline',
    friendshipStatus: 'accepted',
    profileImageURL: 'null',
    description: 'null',
  },
  {
    id: 9,
    name: '한설희',
    status: 'away',
    friendshipStatus: 'accepted',
    profileImageURL: 'null',
    description: 'null',
  },
  {
    id: 10,
    name: '이명욱',
    status: 'online',
    friendshipStatus: 'accepted',
    profileImageURL: 'null',
    description: 'null',
  },
  {
    id: 11,
    name: '윤하연',
    status: 'offline',
    friendshipStatus: 'accepted',
    profileImageURL: 'null',
    description: 'null',
  },
  {
    id: 12,
    name: '민준수',
    status: 'away',
    friendshipStatus: 'accepted',
    profileImageURL: 'null',
    description: 'null',
  },
];
