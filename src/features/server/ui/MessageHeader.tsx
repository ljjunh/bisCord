import { ChannelUnlockedIcon } from '@/shared/icons/ChannelUnlockedIcon';

interface Servername {
  serverName: string | undefined;
}

const MessageHeader = ({ serverName }: Servername) => {
  return (
    <div className="flex h-[50px] w-full items-center border-b border-black px-4 py-2 shadow-sm">
      <ChannelUnlockedIcon size={20} />
      <div className="ml-2 font-semibold text-white">{serverName}</div>
    </div>
  );
};

export { MessageHeader };
