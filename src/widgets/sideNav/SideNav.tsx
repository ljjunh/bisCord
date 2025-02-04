import { useQuery } from '@tanstack/react-query';
import { MODAL, useModalStore } from '@/shared/model/modalStore';
import { serverQueries } from '@/features/server/api/queries';
import CreateServerAvatar from '@/features/server/ui/CreateServerAvatar';
import { JoinServerAvatar } from '@/features/server/ui/JoinServerAvatar';
import { JoinToServerModal } from '@/features/server/ui/JoinToServerModal';
import { ROUTES } from '@/shared/constants/routes';
import DMAvatar from '../../features/directMessage/ui/DMAvatar';
import ServerAvatar from '../../features/server/ui/ServerAvatar';
import CreateServerModal from './CreateServerModal';

/** 화면 제일 왼 쪽 서버 아이콘 리스트 UI */
const SideNav = () => {
  const { data } = useQuery({ ...serverQueries.getServers });
  const { type, onOpenModal } = useModalStore((state) => state);

  const servers = data?.content;

  // 모달 열기/닫기 핸들러

  // localStorage.clear();

  return (
    <div className="flex h-[100vh] min-w-[60px] flex-col items-center gap-3 overflow-hidden bg-black py-3">
      {/* 다이렉트 메세지 부분 */}
      <div>
        <DMAvatar link={ROUTES.ROOT} />
      </div>
      <div className="h-[3px] w-[60%] rounded-md bg-gray" />
      {/* 현재 서버 리스트 */}
      <div className="flex flex-col gap-2 overflow-y-scroll scrollbar-hide">
        {servers &&
          servers.map((server) => (
            <ServerAvatar
              key={server.serverUri}
              server={server}
              link={ROUTES.CHAT.SERVER.DETAIL(server.serverUri)}
            ></ServerAvatar>
          ))}
      </div>

      {/* 아래 서버 추가 및 찾기 */}
      <div onClick={() => onOpenModal(MODAL.CREATE_SERVER)}>
        <CreateServerAvatar />
      </div>
      <div onClick={() => onOpenModal(MODAL.JOIN_SERVER)}>
        <JoinServerAvatar />
      </div>

      {/* 모달입니당 */}
      {type === MODAL.CREATE_SERVER && <CreateServerModal />}
      {type === MODAL.JOIN_SERVER && <JoinToServerModal />}
    </div>
  );
};

export default SideNav;
