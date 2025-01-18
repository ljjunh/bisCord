import { friendQuery } from '../api/queries';
import { DUMMY_FRIENDS, EMPTY_STATE_MESSAGES } from '../model/constants';
import { FriendList } from './FriendList';
import SearchIcon from '@/shared/icons/SearchIcon';
import { useQuery } from '@tanstack/react-query';

export const AllFriendsView = () => {
  const { data } = useQuery(friendQuery.getFriends({ type: 'ACCEPTED' }));

  console.log(data);

  return (
    <div className="flex max-h-screen flex-col">
      {/* 검색창 온라인상태를 백에서 처리 할 수 있다면 분리해서 사용*/}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="검색하기"
            className="w-full rounded-md bg-black px-4 py-1.5 text-white focus:outline-none"
          />
          <div className="absolute right-3 top-2 h-5 w-5">
            <SearchIcon />
          </div>
        </div>
      </div>

      <div className="px-4 py-2 pb-4 text-xs font-bold text-super-light-gray">
        모든 친구 — {DUMMY_FRIENDS.length}명
      </div>

      <FriendList
        emptyMessage={EMPTY_STATE_MESSAGES['all'] || EMPTY_STATE_MESSAGES.default}
        friends={DUMMY_FRIENDS}
      />
    </div>
  );
};
