import { Suspense, lazy } from 'react';
import { useModalStore } from '@/shared/model/store/modalStore';
import { ChannelList } from '@/widgets/channel/ui/ChannelList';
import { MODAL } from '@/shared/model/constants/modal';
import { SEO_CONFIG } from '@/shared/model/constants/seo';
import { Seo } from '@/shared/ui/Seo';
import { ModalSkeleton } from '@/shared/ui/skeleton/ModalSkeleton';

const EditServerModal = lazy(() => import('@/features/server/ui/EditServerModal'));
const InvitedMemberModal = lazy(() => import('@/features/server/ui/InvitedMemberModal'));

const ChannelPage = () => {
  const { type } = useModalStore((state) => state);

  return (
    <>
      <Seo
        title={SEO_CONFIG.SERVER.title}
        description={SEO_CONFIG.SERVER.description}
        url={SEO_CONFIG.SERVER.url}
      />
      <div className="flex h-full w-full flex-row bg-black">
        <ChannelList />
        {/* <ChannelMessage /> */}
      </div>
      <Suspense fallback={<ModalSkeleton />}>
        {type === MODAL.INVIDE_MEMBER && <InvitedMemberModal />}
        {type === MODAL.EDIT_SERVER && <EditServerModal />}
      </Suspense>
    </>
  );
};

export default ChannelPage;
