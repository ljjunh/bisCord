import DiscordIcon from '../../shared/icons/DiscordIcon';
import DiscoveryIcon from '../../shared/icons/DiscoveryIcon';
import PlusIcon from '../../shared/icons/PlusIcon';
import { path } from '../../shared/path';
import ServerAvatar from './ServerAvatar';
import { serverDatas } from '@/shared/mockData/serverMockData';
import { NavLink } from 'react-router-dom';

/** 화면 제일 왼 쪽 서버 아이콘 리스트 UI */
const SideNav = () => {
  const servers = serverDatas;

  return (
    <div className="flex h-[100vh] flex-col items-center gap-3 overflow-hidden bg-black p-3">
      {/* 다이렉트 메세지 부분 */}
      <ServerAvatar>
        <NavLink to={path.directmessage}>
          <DiscordIcon
            size={30}
            color="#ffffff"
          />
        </NavLink>
      </ServerAvatar>

      <div className="h-1 w-[30px] rounded-md bg-dark-gray" />

      {/* 서버 커스텀 이미지가 없을 때 기본 아이콘으로 설정 */}

      {/* 현재 서버 리스트 */}
      {servers.map((server) => (
        <NavLink
          to={path.server_id(server.id)}
          key={server.id}
        >
          <ServerAvatar server={server}>
            <div className="h-[50px] w-[50px] bg-light-gray"></div>
          </ServerAvatar>
        </NavLink>
      ))}

      {/* 아래 서버 추가 및 찾기 */}
      <ServerAvatar search>
        <PlusIcon
          size={15}
          color="#ffffff"
        />
      </ServerAvatar>
      <ServerAvatar search>
        <DiscoveryIcon
          size={20}
          color="#ffffff"
        />
      </ServerAvatar>
    </div>
  );
};

export default SideNav;
