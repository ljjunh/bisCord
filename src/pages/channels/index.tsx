import ChannelList from '@/widgets/channel/ui/ChannelList';
import ChannelMessage from '@/widgets/channel/ui/ChannelMessage';
import { SEO_CONFIG } from '@/shared/constants/seo';
import { Seo } from '@/shared/ui/Seo';

const ChannelPage = () => {
  return (
    <>
      <Seo
        title={SEO_CONFIG.SERVER.title}
        description={SEO_CONFIG.SERVER.description}
        url={SEO_CONFIG.SERVER.url}
      />
      <div className="flex h-full flex-row bg-black">
        <ChannelList />
        <ChannelMessage />
      </div>
    </>
  );
};

export default ChannelPage;
