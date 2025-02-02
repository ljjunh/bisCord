import { isEmpty } from 'es-toolkit/compat';
import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useDebounce } from '@/shared/lib/useDebounce';
import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll';
import { EmptyState } from '@/shared/ui/EmptyState';
import { SwitchCase } from '@/shared/ui/SwitchCase';
import { friendQueries } from '../../friend/api/queries';
import { FRIEND_REQUEST_TYPE } from '../../friend/model/constants';
import { SearchedFriendList } from './SearchedFriendList';

export const SelectDMFriend = () => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null);

  const debouncedSearchInput = useDebounce(searchInput);

  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...friendQueries.getFriends({
      type: FRIEND_REQUEST_TYPE.ACCEPTED,
      keyword: debouncedSearchInput || undefined,
    }),
  });

  const observerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isLoading: isFetchingNextPage,
  });

  const allFriends = data?.pages.flatMap((page) => page.content) ?? [];
  const isNotHaveFriends = [allFriends, searchInput].every(isEmpty) && !isFetching;
  const isNothingSearched = searchInput && isEmpty(allFriends) && !isFetching;

  const getFriendListState = () => {
    if (isNotHaveFriends) return 'NO_FRIENDS';
    if (isNothingSearched) return 'NO_RESULTS';
    return 'HAS_FRIENDS';
  };

  return (
    <>
      <div className="mb-2 text-lg font-bold text-white">친구 선택하기</div>
      <div className="rounded-md bg-black p-2.5">
        <input
          type="text"
          placeholder="친구의 사용자명 또는 이메일 입력하기"
          className="w-full bg-black text-white focus:outline-none"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
      </div>
      <div className="mt-4 max-h-[200px] space-y-2 overflow-y-auto">
        <SwitchCase
          value={getFriendListState()}
          caseBy={{
            NO_FRIENDS: <EmptyState message="친구를 추가해주세요." />,
            NO_RESULTS: <EmptyState message="검색 결과가 없습니다." />,
            HAS_FRIENDS: (
              <SearchedFriendList
                friends={allFriends}
                observerRef={observerRef}
                selectedFriendId={selectedFriendId}
                onSelectFriend={setSelectedFriendId}
              />
            ),
          }}
        />
        <div ref={observerRef} />
      </div>
      {!isNotHaveFriends && !isNothingSearched && (
        <button className="mt-4 w-full rounded-md bg-blue py-2.5 text-sm font-medium text-white hover:bg-blue-purple">
          DM 생성
        </button>
      )}
    </>
  );
};
