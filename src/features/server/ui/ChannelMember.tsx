import { useEffect } from 'react';
import MemberList from './MemberList';

interface ChannelMemberList {
  server: string | undefined;
}

const ChannelMemberList = ({ server }: ChannelMemberList) => {
  //   const { data, refetch } = useQuery({ ...serverQueries.getMember({ server }) });

  useEffect(() => {
    console.log(server);
    // console.log(channelId);
  }, [server]);

  return (
    <div className="h-full w-[250px] bg-dark-gray px-4 py-4">
      <div className="mb-2 flex w-full items-center gap-2 text-xs text-light-gray">
        온라인
        <div className="h-[1px] w-4 bg-light-gray"></div>
        <div>{'3'}</div>
      </div>
      <div className="flex flex-col gap-2">
        <MemberList />
        <MemberList />
        <MemberList />
      </div>
    </div>
  );
};

export { ChannelMemberList };
