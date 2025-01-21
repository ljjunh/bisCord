import { FriendRequestType } from '../model/types';
import type { Friend } from '@/entities/friend/model/types';
import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';
import { FriendItem } from './FriendItem';

interface FriendListProps {
  mode: FriendRequestType;
  friends: Friend[];
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isLoading: boolean;
}

export const FriendList = ({
  mode,
  friends,
  fetchNextPage,
  hasNextPage,
  isLoading,
}: FriendListProps) => {
  const observerRef = useInfiniteScroll({ fetchNextPage, hasNextPage, isLoading });

  return (
    <ul
      role="list"
      className="mb-12 flex h-full flex-col space-y-1 overflow-y-auto pb-10"
    >
      {friends.map((friend) => (
        <li key={friend.id}>
          <FriendItem
            key={friend.id}
            mode={mode}
            friend={friend}
          />
        </li>
      ))}
      {isLoading && (
        <li aria-live="polite">
          <LoadingSpinner />
        </li>
      )}
      {hasNextPage && (
        <div
          ref={observerRef}
          className="h-20"
        />
      )}
    </ul>
  );
};
