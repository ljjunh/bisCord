import ChannelCategories from './ChannelCategories';
import useGetParams from '@/entities/hooks/getParams';
import { serverDatas } from '@/shared/mockData/serverMockData';
import ListContainer from '@/shared/ui/layout/ListContainer';
import { useEffect } from 'react';

/** 친구 및 서버 목록 리스트 UI */
const ChannelList = () => {
  const { serverId } = useGetParams<{ serverId: string }>(); // `serverId`를 명시적으로 가져오기

  // 현재 서버 정보를 가져옴
  const getServerData = serverDatas.find((server) => server.id === Number(serverId));

  useEffect(() => {
    // 디버깅 로직
    console.log('params:', serverId);
  }, [serverId]);

  return (
    <ListContainer>
      {/* 서버 헤더 */}
      <div className="flex h-[50px] items-center border-b-2 border-black p-2 text-lg font-bold text-white hover:bg-gray">
        {getServerData ? getServerData.serverName : 'Unknown Server'}
      </div>

      {/* 채널 리스트 */}
      {getServerData?.serverChannelList.map((channel) => (
        <ChannelCategories
          key={channel.id}
          channel={channel}
        />
      ))}
    </ListContainer>
  );
};

export default ChannelList;
