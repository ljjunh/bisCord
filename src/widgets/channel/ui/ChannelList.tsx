import ChannelCategories from './ChannelCategories';
import useGetParams from '@/entities/hooks/getParams';
import ChannelHeader from '@/features/Server/ChannelHeader';
import { useServerStore } from '@/shared/model/server/store';
import EmptyList from '@/shared/ui/EmptyList';
import ListContainer from '@/shared/ui/layout/ListContainer';
import { useEffect } from 'react';

/** 서버 채널 목록 리스트 UI */
const ChannelList = () => {
  const { serverId } = useGetParams<{ serverId: string }>(); // `serverId`를 명시적으로 가져오기
  const servers = useServerStore((state) => state.servers);

  // 현재 서버 정보를 가져옴
  const getServerData = servers.find((server) => server.id === serverId);

  useEffect(() => {
    // 디버깅 로직
    console.log('getServerData:', getServerData);
  }, [getServerData]);

  return (
    <ListContainer>
      {/* 서버 헤더 */}
      <ChannelHeader getServerData={getServerData?.name} />

      {/* 채널 리스트 */}
      {getServerData ? (
        // getServerData.serverChannelList?.map((channel) => (
        <ChannelCategories channel={getServerData.serverChannelList} />
      ) : (
        // ))
        <EmptyList />
      )}
    </ListContainer>
  );
};

export default ChannelList;
