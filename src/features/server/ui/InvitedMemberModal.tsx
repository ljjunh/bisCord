import { useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useModalStore } from '@/shared/model/modalStore';
import useGetParams from '@/entities/hooks/getParams';
import { serverQueries } from '@/entities/server/api/queries';
import { useDebounce } from '@/shared/lib/useDebounce';
// import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll';
import { SearchInput } from '@/shared/ui/SearchInput';
import ModalContainer from '@/shared/ui/layout/ModalContainer';
import { friendQueries } from '../../friend/api/queries';
import { FRIEND_REQUEST_TYPE } from '../../friend/model/constants';
import MemberList from './MemberList';

const InvitedMemberModal = () => {
  const { serverId } = useGetParams<{ serverId: string }>(); // `serverId`를 명시적으로 가져오기
  const { type, onCloseModal } = useModalStore((state) => state);
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText);

  const validServerId = serverId ?? ''; // 기본값 설정

  // 현재 서버 정보를 가져옴
  const { data: getServerData } = useQuery({
    ...serverQueries.getServerDetail(validServerId),
    enabled: !!serverId, // serverId가 있을 때만 쿼리 실행
  });
  const serverName = getServerData?.name;

  const {
    data: getFriends,
    // isFetching,
    // fetchNextPage,
    // hasNextPage,
    // isFetchingNextPage,
  } = useInfiniteQuery({
    ...friendQueries.getFriends({
      type: FRIEND_REQUEST_TYPE.ACCEPTED,
      keyword: debouncedSearchText || undefined,
    }),
  });
  // const observerRef = useInfiniteScroll({ fetchNextPage, hasNextPage, isLoading });
  const allFriends = getFriends?.pages.flatMap((page) => page.content) ?? [];

  // useEffect(() => {
  //   console.log(allFriends);
  // }, [allFriends]);

  return (
    <ModalContainer
      isOpen={type === 'INVIDE_MEMBER'}
      onClose={onCloseModal}
      subTitle={`친구를 ${serverName}님의 서버 그룹으로 초대하기`}
      description=""
    >
      <div className="w-full p-4 shadow-md">
        <SearchInput
          value={searchText}
          onChange={setSearchText}
          className="w-full"
          placeholder="친구 찾기"
        />
      </div>
      <div className="h-[200px] w-full overflow-y-scroll px-2 scrollbar-hide">
        {allFriends.map((friends) => (
          <MemberList friends={friends}>
            <button className="ml-auto rounded-md border-2 border-green px-4 py-1 transition-all hover:bg-green">
              초대
            </button>
          </MemberList>
        ))}
      </div>
      {/* {data} */}

      <div className="flex w-full flex-col gap-2 bg-dark-gray p-4 text-start">
        <p className="text-xs font-semibold text-light-gray">
          또는 친구에게 서버 초대 링크 전송하기
        </p>
        <div className="flex w-full items-center justify-between rounded-md bg-black p-1">
          <p>link 어쩌구</p>
          <button
            className="rounded-md bg-blue px-4 py-2 text-xs"
            type="submit"
          >
            복사
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default InvitedMemberModal;
