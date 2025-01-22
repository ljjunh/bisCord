import { isEmpty } from 'es-toolkit/compat';
import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FRIEND_LOGIN_STATUS } from '@/entities/friend/model/constants';
import { useDebounce } from '@/shared/lib/useDebounce';
import { EmptyView } from '@/shared/ui/EmptyView';
import { SearchInput } from '@/shared/ui/SearchInput';
import { friendQueries } from '../api/queries';
import { FRIEND_REQUEST_TYPE } from '../model/constants';
import { FriendList } from './FriendList';

export const OnlineFriendsView = () => {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword);

  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...friendQueries.getFriends({
      type: FRIEND_REQUEST_TYPE.ACCEPTED,
      status: FRIEND_LOGIN_STATUS.LOGIN,
      keyword: debouncedKeyword || undefined,
    }),
  });

  const allFriends = data?.pages.flatMap((page) => page.content) ?? [];

  // Case 1: 친구가 한 명도 없는 경우
  if ([allFriends, keyword].every(isEmpty)) {
    return (
      <section
        role="tabpanel"
        id="all-panel"
        aria-labelledby="all-tab"
        className="bg-darker-gray flex h-full flex-col items-center justify-center"
      >
        <EmptyView message="아무도 비슷코드와 놀고 싶지 않은가 봐요." />
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
        온라인 — {allFriends.length}명
      </h2>

      {/* Case 2: 검색 결과가 없는 경우  */}
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
          mode={FRIEND_REQUEST_TYPE.ACCEPTED}
          friends={allFriends}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isLoading={isFetchingNextPage}
        />
      )}
    </section>
  );
};
