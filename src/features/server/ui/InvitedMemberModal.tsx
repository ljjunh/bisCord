import { isEmpty } from 'es-toolkit/compat';
import { useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useModalStore } from '@/shared/model/modalStore';
import useGetParams from '@/entities/hooks/getParams';
import { useDebounce } from '@/shared/lib/useDebounce';
import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll';
import { SearchInput } from '@/shared/ui/SearchInput';
import ModalContainer from '@/shared/ui/layout/ModalContainer';
import { friendQueries } from '../../friend/api/queries';
import { serverQueries } from '../api/queries';
import { FRIEND_REQUEST_TYPE } from '../../friend/model/constants';
import { InviteUrlLink } from './InviteUrlLink';
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
    // enabled: !!serverId, // serverId가 있을 때만 쿼리 실행
  });
  const serverName = getServerData?.name;

  // 친구 목록 가져옴
  const {
    data: getFriends,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...friendQueries.getFriends({
      type: FRIEND_REQUEST_TYPE.ACCEPTED,
      keyword: debouncedSearchText || undefined,
    }),
  });

  const allFriends = getFriends?.pages.flatMap((page) => page.content) ?? [];
  const isNothingSearched = searchText && isEmpty(allFriends) && !isFetching;

  const observerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isLoading: isFetchingNextPage,
  });

  // 초대 코드를 받아옴 => 이거 하위로 넘김 필요하면 다시 쓸꺼임;;;;
  // const { data: inviteUrl } = useQuery({
  //   ...serverQueries.postInvite(validServerId),
  // });
  // const validInviteUrl = inviteUrl?.inviteUrl.split('/');
  // const lastElement = validInviteUrl?.[validInviteUrl.length - 1];

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
        {isNothingSearched ? (
          <div className="text-xs">'{searchText}'님은 친구 목록에 없습니다.</div>
        ) : (
          allFriends.map((friends) => (
            <>
              <MemberList
                friends={friends}
                key={friends.id}
              >
                <button className="ml-auto rounded-md border-2 border-green px-4 py-1 transition-all hover:bg-green">
                  초대
                </button>
              </MemberList>
            </>
          ))
        )}
        <div
          ref={observerRef}
          className="h-[1px] w-full"
        />
      </div>
      {/* {data} */}

      <InviteUrlLink validServerId={validServerId} />
    </ModalContainer>
  );
};

export default InvitedMemberModal;
