import { useModalStore } from '@/shared/model/modalStore';
import { ChannelList } from '@/widgets/channel/ui/ChannelList';
import { EditServerModal } from '@/features/server/ui/EditServerModal';
import { InvitedMemberModal } from '@/features/server/ui/InvitedMemberModal';
import { MODAL } from '@/shared/constants/modal';
import { SEO_CONFIG } from '@/shared/constants/seo';
import { Seo } from '@/shared/ui/Seo';

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
      {type === MODAL.INVIDE_MEMBER && <InvitedMemberModal />}
      {type === MODAL.EDIT_SERVER && <EditServerModal />}
    </>
  );
};

export default ChannelPage;
