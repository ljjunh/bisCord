import { Servers } from '@/entities/server/model/types';
import { ChannelMemberList } from '@/features/server/ui/ChannelMember';
import { MessageHeader } from '@/features/server/ui/MessageHeader';
import { MessageInput } from '@/features/server/ui/MessageInput';
import ChannelMessageDefault from '@/shared/ui/ChannelMessageDefault';

interface ChannelMessage {
  server: Servers | undefined;
}

const ChannelMessage = ({ server }: ChannelMessage) => {
  return (
    <div className="flex h-full w-full flex-grow flex-col bg-mid-gray">
      <MessageHeader serverName={server?.name} />
      <div className="flex w-full flex-grow flex-row overflow-y-scroll scrollbar-hide">
        <div className="flex flex-grow flex-col justify-end">
          <ChannelMessageDefault serverName={server?.name}>
            {/* 여기에 친구초대 버튼 */}
          </ChannelMessageDefault>
          <MessageInput />
        </div>
        <div className="hidden h-full lg:block">
          <ChannelMemberList server={server?.serverUri} />
        </div>
      </div>
    </div>
  );
};

export default ChannelMessage;
