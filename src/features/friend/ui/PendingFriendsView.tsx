import { isEmpty } from 'es-toolkit/compat';
import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useDebounce } from '@/shared/lib/useDebounce';
import { EmptyView } from '@/shared/ui/EmptyView';
import { SearchInput } from '@/shared/ui/SearchInput';
import { friendQueries } from '../api/queries';
import { FRIEND_REQUEST_TYPE } from '../model/constants';
import { FriendList } from './FriendList';

export const PendingFriendsView = () => {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword);

  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...friendQueries.getFriends({
      type: FRIEND_REQUEST_TYPE.PENDING,
      keyword: debouncedKeyword || undefined,
    }),
  });

  const allFriends = data?.pages.flatMap((page) => page.content) ?? [];

  // Case 1: 대기중인 요청이 없는 경우
  if ([allFriends, keyword].every(isEmpty)) {
    return (
      <section
        role="tabpanel"
        id="all-panel"
        aria-labelledby="all-tab"
        className="bg-darker-gray flex h-full flex-col items-center justify-center"
      >
        <EmptyView message="대기 중인 친구 요청이 없네요. 그래도 옆에 Biscord는 있네요." />
      </section>
    );
  }

  return (
    <section
      role="tabpanel"
      id="all-panel"
      aria-labelledby="all-tab"
      className="flex max-h-screen flex-col"
    >
      <header className="p-4">
        <SearchInput
          value={keyword}
          onChange={setKeyword}
        />
      </header>

      <h2 className="px-4 py-2 pb-4 text-xs font-bold text-super-light-gray">
        대기 중 — {allFriends.length}명
      </h2>

      {/* Case 2: 검색 결과가 없는 경우 */}
      {keyword && !isFetching && isEmpty(allFriends) ? (
        <div className="bg-darker-gray flex flex-1 flex-col items-center justify-center p-4">
          <section
            role="tabpanel"
            id="all-panel"
            aria-labelledby="all-tab"
            className="bg-darker-gray flex h-full flex-col items-center justify-center"
          >
            <EmptyView message="Biscord가 찾아봤지만 이 이름을 쓰는 이용자는 없어요." />
          </section>
        </div>
      ) : (
        /* Case 3: 검색 결과가 있는 경우 */
        <FriendList
          mode={FRIEND_REQUEST_TYPE.PENDING}
          friends={allFriends}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isLoading={isFetchingNextPage}
        />
      )}
    </section>
  );
};
