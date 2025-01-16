import ContentsContainer from '@/shared/ui/layout/ContentsContainer';
import ChannelList from '@/widgets/channel/ui/ChannelList';

const ChannelPage = () => {
  return (
    <div className="flex h-full bg-black">
      <ChannelList />
      <ContentsContainer />
    </div>
  );
};

export default ChannelPage;
