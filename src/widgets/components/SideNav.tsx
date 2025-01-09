import { Link } from "react-router-dom";
import DiscordIcon from "../../shared/icons/DiscordIcon";
import DiscoveryIcon from "../../shared/icons/DiscoveryIcon";
import PlusIcon from "../../shared/icons/PlusIcon";
import ServerAvatar from "./ServerAvatar";

/** 화면 제일 왼 쪽 서버 아이콘 리스트 UI */
const SideNav = () => {
  return (
    <div className="flex flex-col items-center h-[100vh] gap-3 bg-black overflow-hidden p-3">
      {/* 다이렉트 메세지 부분 */}
      <ServerAvatar>
        <Link to={"/directmessage"}>
          <DiscordIcon size={30} color="#ffffff" />
        </Link>
      </ServerAvatar>

      <div className="w-[30px] h-1 bg-dark-gray rounded-md" />

      {/* 서버 커스텀 이미지가 없을 때 기본 아이콘으로 설정 */}

      {/* 현재 서버 리스트 */}
      <div className="w-[50px] h-[50px] bg-light-gray"></div>
      <div className="w-[50px] h-[50px] bg-light-gray"></div>
      <div className="w-[50px] h-[50px] bg-light-gray"></div>

      {/* 아래 서버 추가 및 찾기 */}
      <ServerAvatar search>
        <PlusIcon size={15} color="#ffffff" />
      </ServerAvatar>
      <ServerAvatar search>
        <DiscoveryIcon size={20} color="#ffffff" />
      </ServerAvatar>
    </div>
  );
};

export default SideNav;
