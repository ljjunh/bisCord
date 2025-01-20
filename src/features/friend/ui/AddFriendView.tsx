import { AddFriendButton } from './AddFriendButton';
import { FRIEND_LOGIN_STATUS } from '@/entities/friend/model/constants';
import { userQueries } from '@/entities/user/api/queries';
import { useDebounce } from '@/shared/lib/useDebounce';
import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll';
import { EmptyView } from '@/shared/ui/EmptyView';
import { SearchInput } from '@/shared/ui/SearchInput';
import UserAvatar from '@/shared/ui/UserAvatar';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/shared/ui/command';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const AddFriendView = () => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText);

  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...userQueries.getUsers({ keyword: debouncedSearchText }),
    enabled: searchText.length > 0,
  });

  const observerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isLoading: isFetchingNextPage,
  });

  const users = data?.pages.flatMap((page) => page.content) ?? [];

  return (
    <section>
      <div className="space-y-3 border-b border-gray px-8 py-4">
        <h1 className="font-bold text-white">친구 추가하기</h1>
        <p className="text-sm text-super-light-gray">
          Biscord 사용자명과 이메일을 사용하여 친구를 추가할 수 있어요.
        </p>
        <div className="relative">
          <SearchInput
            value={searchText}
            onChange={setSearchText}
            placeholder="Biscord 사용자명과 이메일을 사용하여 친구를 추가할 수 있어요."
            className="h-12 w-full"
          />
          {searchText && (
            <Command className="absolute top-full mt-1 h-auto max-h-[300px] w-full rounded-lg border border-gray bg-black">
              <CommandList>
                {isFetching && <CommandEmpty>검색중...</CommandEmpty>}
                {!isFetching && users.length === 0 && (
                  <CommandEmpty>비슷코드가 찾아봤지만 이 이름을 쓰는 사용자는 없어요.</CommandEmpty>
                )}
                {users.length > 0 && (
                  <>
                    <CommandGroup>
                      {users.map((user) => (
                        <CommandItem
                          key={user.id}
                          className="group hover:bg-gray-700"
                        >
                          <div className="flex w-full items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <UserAvatar
                                image={user.profileImageURL}
                                size={20}
                                state={user.loginStatus === FRIEND_LOGIN_STATUS.LOGIN}
                              />
                              <div className="flex gap-2">
                                <h3 className="font-bold text-white">{user.name}</h3>
                                <span className="hidden text-super-light-gray group-hover:inline">
                                  {user.email}
                                </span>
                              </div>
                            </div>
                            <AddFriendButton invitedUserId={user.id} />
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    {hasNextPage && (
                      <div
                        ref={observerRef}
                        className="h-4"
                      />
                    )}
                  </>
                )}
              </CommandList>
            </Command>
          )}
        </div>
      </div>
      <div>
        <EmptyView message="비슷코드는 친구를 기다리고 있어요." />
      </div>
    </section>
  );
};
