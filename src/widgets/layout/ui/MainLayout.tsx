// import ChannelList from '../channel/ui/ChannelList';
import { Outlet } from 'react-router-dom';
import { useModalStore } from '@/shared/model/modalStore';
import { SignOffModal } from '@/features/auth/ui/SignOffModal';
import { UserProfileModal } from '@/features/user/ui/UserProfileModal';
import ContentsContainer from '@/shared/ui/layout/ContentsContainer';
import SideNav from '../../sideNav/SideNav';

/** Main UI layout */
const Layout = () => {
  const modalType = useModalStore((state) => state.type);

  return (
    <div className="relative flex h-full w-full flex-row bg-mid-gray">
      <SideNav />
      <ContentsContainer>
        <Outlet />
        {modalType === 'USER_PROFILE' && <UserProfileModal />}
        {modalType === 'USER_SIGNOFF' && <SignOffModal />}
      </ContentsContainer>
    </div>
  );
};

export default Layout;
