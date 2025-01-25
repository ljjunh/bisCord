// import ChannelList from '../channel/ui/ChannelList';
import { Outlet } from 'react-router-dom';
import { UserProfileModal } from '@/features/user/ui/UserProfileModal';
import ContentsContainer from '@/shared/ui/layout/ContentsContainer';
import SideNav from '../sideNav/SideNav';

/** Main UI layout */
const Layout = () => {
  return (
    <div className="relative flex h-full w-full flex-row bg-mid-gray">
      <SideNav />
      <ContentsContainer>
        <Outlet />
        <UserProfileModal />
      </ContentsContainer>
    </div>
  );
};

export default Layout;
