import { User } from '../../user/model/types';

export interface Friend extends User {
  friendshipStatus: 'accepted' | 'pending' | 'blocked';
}
