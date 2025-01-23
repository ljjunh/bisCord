import { MessageHeader } from '@/features/server/ui/MessageHeader';
import { MessageInput } from '@/features/server/ui/MessageInput';
import ChannelMessageDefault from '@/shared/ui/ChannelMessageDefault';

interface ChannelMessage {
  serverName: string | undefined;
}

const ChannelMessage = ({ serverName }: ChannelMessage) => {
  return (
    <div className="flex h-full w-full flex-grow flex-col bg-mid-gray">
      <MessageHeader serverName={serverName} />
      <div className="flex w-full flex-grow flex-col justify-end overflow-y-scroll scrollbar-hide">
        <ChannelMessageDefault serverName={serverName}>
          {/* 여기에 친구초대 버튼 */}
        </ChannelMessageDefault>
      </div>
      <MessageInput />
    </div>
  );
};

export default ChannelMessage;
