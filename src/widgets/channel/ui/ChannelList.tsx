import { useQuery } from '@tanstack/react-query';
import ChannelCategories from '@/features/server/ui/ChannelCategories';
import ChannelHeader from '@/features/server/ui/ChannelHeader';
import useGetParams from '@/entities/hooks/getParams';
import { serverQueries } from '@/entities/server/api/queries';
import EmptyList from '@/shared/ui/EmptyList';
import ListContainer from '@/shared/ui/layout/ListContainer';

/** 서버 채널 목록 리스트 UI */
const ChannelList = () => {
  const { serverId } = useGetParams<{ serverId: string }>(); // `serverId`를 명시적으로 가져오기
  const validServerId = serverId ?? ''; // 기본값 설정

  // 현재 서버 정보를 가져옴
  const { data: getServerData, isLoading } = useQuery({
    ...serverQueries.getServerDetail(validServerId),
    enabled: !!serverId, // serverId가 있을 때만 쿼리 실행
  });

  /** 데이터를 가져오는 중입니다 */
  if (isLoading) return <p>Loading...</p>;

  return (
    <ListContainer>
      {/* 서버 헤더 */}
      <ChannelHeader getServerData={getServerData?.name} />

      {/* 채널 리스트 */}
      {getServerData ? <ChannelCategories serverId={getServerData.serverUri} /> : <EmptyList />}
    </ListContainer>
  );
};

export default ChannelList;
