import { invariant } from 'es-toolkit/compat';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { serverQueries } from '@/features/server/api/queries';
import { ChannelCategories } from '@/features/server/ui/ChannelCategories';
import { ChannelHeader } from '@/features/server/ui/ChannelHeader';
import { UserProfileBar } from '@/features/user/ui/UserProfileBar';
import { EmptyList } from '@/shared/ui/EmptyList';
import { ListContainer } from '@/shared/ui/layout/ListContainer';
import { ChannelMessage } from './ChannelMessage';
import { ChannelSkeleton } from './ChannelSkeleton';
import { ServerDefault } from './ServerDefault';

/** 서버 채널 목록 리스트 UI */
export const ChannelList = () => {
  const { serverId, '*': channelId } = useParams();
  invariant(serverId, 'Server ID is missing in URL parameters');

  // 현재 서버 정보를 가져옴
  const { data: getServerData, isLoading } = useQuery({
    ...serverQueries.getServerDetail(serverId),
    enabled: !!serverId, // serverId가 있을 때만 쿼리 실행
  });

  if (isLoading) return <ChannelSkeleton />;

  return (
    <div className="flex w-full flex-row">
      <ListContainer>
        {/* 서버 헤더 */}
        <ChannelHeader
          getServerData={getServerData}
          serverUri={getServerData?.serverUri ?? ''}
        />

        {/* 채널 리스트 */}
        {getServerData ? <ChannelCategories serverId={getServerData.serverUri} /> : <EmptyList />}
        <div className="bg-black px-2 py-3">
          <UserProfileBar />
        </div>
      </ListContainer>
      {channelId ? (
        <>
          <ChannelMessage server={getServerData} />
          {/* <ChannelView server={getServerData} /> */}
        </>
      ) : (
        <>
          <ServerDefault server={getServerData} />
        </>
      )}
    </div>
  );
};
