import { FriendItem } from './FriendItem';
import type { Friend } from '@/entities/friend/model/types';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';
import { useEffect, useRef } from 'react';

interface FriendListProps {
  friends: Friend[];
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isLoading: boolean;
}

export const FriendList = ({ friends, fetchNextPage, hasNextPage, isLoading }: FriendListProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isLoading) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isLoading]);

  return (
    <ul
      role="list"
      className="mb-12 flex h-full flex-col space-y-1 overflow-y-auto pb-10"
    >
      {friends.map((friend) => (
        <li key={friend.id}>
          <FriendItem
            key={friend.id}
            friend={friend}
          />
        </li>
      ))}
      {isLoading && (
        <li aria-live="polite">
          <LoadingSpinner />
        </li>
      )}

      <div
        ref={observerRef}
        className="h-20"
      />
    </ul>
  );
};
