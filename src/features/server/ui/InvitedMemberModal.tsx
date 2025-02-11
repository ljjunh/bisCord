import { invariant, isEmpty } from 'es-toolkit/compat';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { useModalStore } from '@/shared/model/store/modalStore';
import { queryClient } from '@/shared/api/queryClient';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import { MODAL } from '@/shared/model/constants/modal';
import { SearchInput } from '@/shared/ui/SearchInput';
import { ModalContainer } from '@/shared/ui/layout/ModalContainer';
import { friendQueries } from '../../friend/api/queries';
import { serverQueries } from '../api/queries';
import { FRIEND_REQUEST_TYPE } from '../../friend/model/constants';
import { InviteUrlLink } from './InviteUrlLink';
import { MemberList } from './MemberList';

export const InvitedMemberModal = () => {
  const serverId = useParams().serverId;
  invariant(serverId, 'Server ID is missing in URL parameters');

  const { type, onCloseModal } = useModalStore((state) => state);
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText);

  const validServerId = serverId ?? '';

  // 현재 서버 정보를 가져옴
  const { data: getServerData } = useQuery({
    ...serverQueries.getServerDetail(validServerId),
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

  const localtion = useLocation();
  const handleInviteMember = (memberId: number, name: string) => {
    if (lastElement === undefined || null) {
      toast.error('초대 권한이 없습니다');
      return;
    }

    mutate({
      recipientId: memberId,
      content: `${getServerData?.name} 서버에서 초대를 보냈어요!  초대코드 : ${lastElement}`,
    });
    toast.success(`${name}님께 초대 메세지를 보냈습니다.`);
    console.log(`${localtion.hash}님 초대`);
  };

  return (
    <ModalContainer
      isOpen={type === MODAL.INVIDE_MEMBER}
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
