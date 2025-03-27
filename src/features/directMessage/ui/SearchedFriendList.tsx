import type { Friend } from '@/entities/friend/model/types';
import { cn } from '@/shared/lib/utils/utils';
import { UserAvatar } from '@/shared/ui/UserAvatar';

interface SearchedFriendListProps {
  friends: Friend[];
  observerRef: React.RefObject<HTMLDivElement>;
  selectedFriendId: number | null;
  onSelectFriend: (friendId: number) => void;
}

export const SearchedFriendList = ({
  friends,
  observerRef,
  selectedFriendId,
  onSelectFriend,
}: SearchedFriendListProps) => {
  return (
    <div
      role="listbox"
      aria-label="친구 목록"
      tabIndex={0}
      className="focus:outline-none"
    >
      {friends.map((friend) => (
        <div
          key={friend.id}
          onClick={() => onSelectFriend(friend.id)}
          role="option"
          className={cn(
            'flex cursor-pointer gap-3 rounded-md px-2 py-1 hover:bg-gray',
            selectedFriendId === friend.id && 'bg-gray',
          )}
        >
          <figure className="h-8 w-8">
            <UserAvatar
              image={friend.profileImageURL}
              size={20}
            />
          </figure>
          <div className="flex flex-1 items-center gap-2">
            <p className="text-lg font-medium text-white">{friend.name}</p>
            <p className="text-xs text-super-light-gray">{friend.email}</p>
          </div>
          <div className="flex items-center">
            <div
              className={cn(
                'h-5 w-5 rounded border border-white',
                selectedFriendId === friend.id && 'bg-blue',
              )}
              aria-hidden="true"
            />
          </div>
        </div>
      ))}
      <div
        ref={observerRef}
        aria-hidden="true"
      />
    </div>
  );
};
