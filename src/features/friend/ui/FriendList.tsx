import { FriendItem } from './FriendItem';
import type { Friend } from '@/entities/friend/model/types';

interface FriendListProps {
  friends: Friend[];
  emptyMessage?: string;
}

export const FriendList = ({ friends, emptyMessage }: FriendListProps) => {
  if (friends.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-super-light-gray">
        <div className="text-center">
          <p>{emptyMessage || '표시할 친구가 없습니다.'}</p>
          <p>그래도 옆에 Wumpus는 있네요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-1 overflow-y-auto">
      {friends.map((friend) => (
        <FriendItem
          key={friend.id}
          friend={friend}
        />
      ))}
    </div>
  );
};
