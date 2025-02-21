import { Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useModalStore } from '@/shared/model/store/modalStore';
import { MODAL } from '@/shared/model/constants/modal';
import { ContentsContainer } from '@/shared/ui/layout/ContentsContainer';
import { ModalSkeleton } from '@/shared/ui/skeleton/ModalSkeleton';
import { SideNav } from '../../sideNav/SideNav';

const UserProfileModal = lazy(() => import('@/features/user/ui/UserProfileModal'));
const WithdrawModal = lazy(() => import('@/features/auth/ui/WithdrawModal'));

const Layout = () => {
  const modalType = useModalStore((state) => state.type);

  return (
    <div className="relative flex h-full w-full flex-row bg-mid-gray">
      <SideNav />
      <ContentsContainer>
        <Outlet />
        <Suspense fallback={<ModalSkeleton />}>
          {modalType === MODAL.USER_PROFILE && <UserProfileModal />}
          {modalType === MODAL.USER_WITHDRAW && <WithdrawModal />}
        </Suspense>
      </ContentsContainer>
    </div>
  );
};

export default Layout;
