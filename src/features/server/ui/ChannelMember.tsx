import { useQuery } from '@tanstack/react-query';
import { serverQueries } from '@/entities/server/api/queries';
import MemberList from './MemberList';

interface ChannelMemberList {
  server: string | undefined;
}

const ChannelMemberList = ({ server }: ChannelMemberList) => {
  const { data } = useQuery({
    ...serverQueries.getMembers({ serverUri: server || '' }), // 올바른 객체 전달
    enabled: !!server, // server가 있을 때만 쿼리 실행
  });

  return (
    <div className="h-full w-[250px] bg-dark-gray px-2 py-4">
      <div className="mb-2 flex w-full items-center gap-2 text-xs text-light-gray">
        전체
        <div className="h-[1px] w-3 bg-light-gray"></div>
        <div>{data?.content.length}</div>
      </div>
      <div className="flex flex-col gap-2">
        {data?.content.map((member, index) => (
          <MemberList
            key={index}
            member={member}
          />
        ))}
      </div>
    </div>
  );
};

export { ChannelMemberList };
