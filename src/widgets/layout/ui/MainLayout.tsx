import { Outlet } from 'react-router-dom';
import { useModalStore } from '@/shared/model/store/modalStore';
import { WithdrawModal } from '@/features/auth/ui/WithdrawModal';
import { UserProfileModal } from '@/features/user/ui/UserProfileModal';
import { MODAL } from '@/shared/constants/modal';
import { ContentsContainer } from '@/shared/ui/layout/ContentsContainer';
import { SideNav } from '../../sideNav/SideNav';

const Layout = () => {
  const modalType = useModalStore((state) => state.type);

  return (
    <div className="relative flex h-full w-full flex-row bg-mid-gray">
      <SideNav />
      <ContentsContainer>
        <Outlet />
        {modalType === MODAL.USER_PROFILE && <UserProfileModal />}
        {modalType === MODAL.USER_WITHDRAW && <WithdrawModal />}
      </ContentsContainer>
    </div>
  );
};

export default Layout;
