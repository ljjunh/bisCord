const ChannelHeader = ({ getServerData }: { getServerData: string | undefined }) => {
  return (
    <div className="flex h-[50px] items-center rounded-tl-[10px] border-b-2 border-black p-2 text-lg font-bold text-white hover:bg-gray">
      {getServerData ? getServerData : ''}
    </div>
  );
};

export default ChannelHeader;
