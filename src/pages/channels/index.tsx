import ChannelList from '@/widgets/channel/ui/ChannelList';
import ContentsContainer from '@/shared/ui/layout/ContentsContainer';

const ChannelPage = () => {
  return (
    <div className="flex h-full flex-row bg-black">
      <ChannelList />
      <ContentsContainer></ContentsContainer>
    </div>
  );
};

export default ChannelPage;
