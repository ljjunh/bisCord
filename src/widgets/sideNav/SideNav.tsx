import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { serverQueries } from '@/entities/server/api/queries';
import { ROUTES } from '@/shared/constants/routes';
import DiscordIcon from '../../shared/icons/DiscordIcon';
// import DiscoveryIcon from '../../shared/icons/DiscoveryIcon';
import PlusIcon from '../../shared/icons/PlusIcon';
import ServerAvatar from '../components/ServerAvatar';
import Modal from './Modal';

/** 화면 제일 왼 쪽 서버 아이콘 리스트 UI */
const SideNav = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, isLoading, refetch } = useQuery({ ...serverQueries.getServers });
  const servers = data?.content;

  useEffect(() => {
    console.log(servers);
  }, [servers, data]);

  // 모달 열기/닫기 핸들러
  const handleModal = () => setIsModalOpen(!isModalOpen);

  if (isLoading) return <></>;

  return (
    <div className="flex h-[100vh] min-w-[60px] flex-col items-center gap-3 overflow-hidden bg-black p-3">
      {/* 다이렉트 메세지 부분 */}
      <div>
        <ServerAvatar>
          <NavLink to={ROUTES.ROOT}>
            <DiscordIcon
              size={30}
              color="#ffffff"
            />
          </NavLink>
        </ServerAvatar>
      </div>

      <div className="h-[2px] w-[100%] rounded-md bg-mid-gray" />

      {/* 서버 커스텀 이미지가 없을 때 기본 아이콘으로 설정 */}
      {/* 현재 서버 리스트 */}
      <div className="flex flex-col gap-2 overflow-y-scroll scrollbar-hide">
        {servers &&
          servers.map((server) => (
            <NavLink
              to={ROUTES.CHAT.SERVER.DETAIL(server.serverUri)}
              key={server.serverUri}
            >
              <ServerAvatar server={server}>
                <div className="h-[50px] w-[50px] bg-light-gray"></div>
              </ServerAvatar>
            </NavLink>
          ))}
      </div>

      {/* 아래 서버 추가 및 찾기 */}
      <div onClick={handleModal}>
        <ServerAvatar search>
          <PlusIcon
            size={15}
            color="#ffffff"
          />
        </ServerAvatar>
      </div>
      {/* <ServerAvatar search>
        <DiscoveryIcon
          size={20}
          color="#ffffff"
        />
      </ServerAvatar> */}

      {/* 모달입니당 */}
      <Modal
        refetch={refetch}
        handleModal={handleModal}
        isModalOpen={isModalOpen}
      ></Modal>
    </div>
  );
};

export default SideNav;
