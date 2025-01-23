import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CreateServerAvatar from '@/features/sideNav/CreateServerAvatar';
import { serverQueries } from '@/entities/server/api/queries';
import { ROUTES } from '@/shared/constants/routes';
import DMAvavar from '../../features/sideNav/DMAvavar';
import ServerAvatar from '../../features/sideNav/ServerAvatar';
import Modal from './Modal';

/** 화면 제일 왼 쪽 서버 아이콘 리스트 UI */
const SideNav = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, isLoading, refetch } = useQuery({ ...serverQueries.getServers });
  const servers = data?.content;

  // 모달 열기/닫기 핸들러
  const handleModal = () => setIsModalOpen(!isModalOpen);

  if (isLoading) return <></>;

  return (
    <div className="flex h-[100vh] min-w-[60px] flex-col items-center gap-3 overflow-hidden bg-black py-3">
      {/* 다이렉트 메세지 부분 */}
      <div>
        <DMAvavar link={ROUTES.ROOT} />
      </div>

      {/* 현재 서버 리스트 */}
      <div className="flex flex-col gap-2 overflow-y-scroll scrollbar-hide">
        {servers &&
          servers.map((server) => (
            <ServerAvatar
              server={server}
              link={ROUTES.CHAT.SERVER.DETAIL(server.serverUri)}
            ></ServerAvatar>
          ))}
      </div>

      {/* 아래 서버 추가 및 찾기 */}
      <div onClick={handleModal}>
        <CreateServerAvatar />
      </div>

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
