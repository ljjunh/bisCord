import type { FRIEND_REQUEST_TYPE } from './constants';

export type FriendTab = 'online' | 'all' | 'pending' | 'add';

export type FriendRequestType = keyof typeof FRIEND_REQUEST_TYPE;
