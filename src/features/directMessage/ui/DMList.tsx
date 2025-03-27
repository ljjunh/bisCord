import { isEmpty } from 'es-toolkit/compat';
import { Link, useLocation } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import { cn } from '@/shared/lib/utils/utils';
import { ROUTES } from '@/shared/model/constants/routes';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';
import { FriendsIcon } from '@/shared/ui/icons/FriendsIcon';
import { DMQueries } from '../api/queries';
import { UserProfileBar } from '../../user/ui/UserProfileBar';
import { CreateDMRoomButton } from './CreateDMRoomButton';
import { DMItem } from './DMItem';

export const DMList = () => {
  const location = useLocation();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...DMQueries.getDMRooms({ size: 20 }),
  });

  const observerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isLoading: isFetchingNextPage,
  });

  const allFriends = data?.pages.flatMap((page) => page.content) ?? [];

  return (
    <div className="flex h-full flex-col rounded-tl-lg bg-dark-gray pt-5">
      <nav className="flex-1 overflow-y-auto">
        <Link
          to={ROUTES.ROOT}
          className={cn(
            'mx-2 mb-3 flex items-center gap-3 rounded px-4 py-3',
            location.pathname === ROUTES.ROOT && 'bg-mid-gray',
          )}
        >
          <FriendsIcon />
          <h2 className="text-lg text-super-light-gray">친구</h2>
        </Link>

        <section aria-labelledby="dm-heading">
          <header className="mb-2 flex items-center justify-between px-4">
            <h2
              id="dm-heading"
              className="text-xs text-super-light-gray"
            >
              다이렉트 메시지
            </h2>
            <CreateDMRoomButton />
          </header>
          <ul
            className="flex min-w-64 flex-col space-y-1"
            aria-label="다이렉트 메시지 목록"
          >
            {!isEmpty(allFriends) &&
              allFriends.map((friend) => (
                <DMItem
                  key={friend.userId}
                  userId={friend.userId}
                  name={friend.name}
                  profileImageURL={friend.profileImageURL}
                  loginStatus={friend.loginStatus}
                  read={friend.read}
                />
              ))}
            {isFetchingNextPage && (
              <li aria-live="polite">
                <LoadingSpinner />
              </li>
            )}
            {hasNextPage && (
              <div
                ref={observerRef}
                className="h-20"
                aria-hidden="true"
              />
            )}
          </ul>
        </section>
      </nav>

      <footer className="bg-black px-2 py-3">
        <UserProfileBar />
      </footer>
    </div>
  );
};
