import { Servers } from '@/features/server/model/types';
import { ChannelMemberList } from '@/features/server/ui/ChannelMember';
import { MessageHeader } from '@/features/server/ui/MessageHeader';
import { ChannelMessageDefault } from '@/shared/ui/ChannelMessageDefault';

interface ChannelMessageProps {
  server: Servers | undefined;
}

export const ServerDefault = ({ server }: ChannelMessageProps) => {
  return (
    <div className="flex h-full w-full flex-grow flex-col bg-mid-gray">
      <MessageHeader serverName={server?.name} />
      <div className="flex w-full flex-grow flex-row overflow-y-scroll scrollbar-hide">
        <div className="flex flex-grow flex-col justify-center">
          <ChannelMessageDefault serverName={server?.name}>
            {/* 여기에 친구초대 버튼 */}
          </ChannelMessageDefault>
        </div>
        <div className="hidden h-full lg:block">
          <ChannelMemberList serverUri={server?.serverUri} />
        </div>
      </div>
    </div>
  );
};
