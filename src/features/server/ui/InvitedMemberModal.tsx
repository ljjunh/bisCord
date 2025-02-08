import { isEmpty } from 'es-toolkit/compat';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { useModalStore } from '@/shared/model/modalStore';
import useGetParams from '@/entities/hooks/getParams';
import { queryClient } from '@/shared/api/queryClient';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { useDebounce } from '@/shared/lib/useDebounce';
import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll';
import { SearchInput } from '@/shared/ui/SearchInput';
import { ModalContainer } from '@/shared/ui/layout/ModalContainer';
import { friendQueries } from '../../friend/api/queries';
import { serverQueries } from '../api/queries';
import { FRIEND_REQUEST_TYPE } from '../../friend/model/constants';
import { InviteUrlLink } from './InviteUrlLink';
import { MemberList } from './MemberList';

export const InvitedMemberModal = () => {
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
  const { data: inviteUrl } = useQuery({
    ...serverQueries.postInvite(validServerId),
  });
  const validInviteUrl = inviteUrl?.inviteUrl.split('/');
  const lastElement = validInviteUrl?.[validInviteUrl.length - 1];

  const { mutate } = useMutation({
    ...serverQueries.postDM,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.directMessage.detail({ validServerId }),
      });
    },
  });
  // const { mutate: openDm } = useMutation({
  //   ...serverQueries.postDMRoom,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: QUERY_KEYS.directMessage.members() });
  //     // navigate(ROUTES.CHAT.DIRECT_MESSAGE.DETAIL(selectedFriendId));
  //   },
  // });

  const localtion = useLocation();
  const handleInviteMember = (memberId: number, name: string) => {
    if (lastElement === undefined || null) {
      toast.error('초대 권한이 없습니다');
      return;
    }
    // openDm({ recipientId: memberId });
    mutate({
      recipientId: memberId,
      content: `${getServerData?.name} 서버에서 초대를 보냈어요!  초대코드 : ${lastElement}`,
    });
    toast.success(`${name}님께 초대 메세지를 보냈습니다.`);
    console.log(`${localtion.hash}님 초대`);
  };

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
          allFriends.map((friends, index) => (
            <>
              <MemberList
                friends={friends}
                key={index}
              >
                <button
                  onClick={() => handleInviteMember(friends.id, friends.name)}
                  className="ml-auto rounded-md border-2 border-green px-4 py-1 transition-all hover:bg-green"
                >
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
