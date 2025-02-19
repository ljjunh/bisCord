import { useInfiniteQuery } from '@tanstack/react-query';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import { serverQueries } from '../api/queries';
import { MemberList } from './MemberList';

interface ChannelMemberListProps {
  serverUri: string | undefined;
}

export const ChannelMemberList = ({ serverUri }: ChannelMemberListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...serverQueries.getMembers({ serverUri: serverUri || '' }), // 올바른 객체 전달
  });
  const allMembers = data?.pages.flatMap((page) => page.content) ?? [];
  const observerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isLoading: isFetchingNextPage,
  });

  return (
    <div className="h-full w-[250px] bg-dark-gray px-2 py-4">
      <div className="mb-2 flex w-full items-center gap-2 text-xs text-light-gray">
        전체
        <div className="h-[1px] w-3 bg-light-gray"></div>
        <div>{allMembers.length}</div>
      </div>
      <div className="flex flex-col gap-2">
        {allMembers &&
          allMembers.map((member, index) => (
            <MemberList
              key={index}
              member={member}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isLoading={isFetchingNextPage}
            />
          ))}
        <div
          ref={observerRef}
          className="h-[1px] w-full"
        ></div>
      </div>
    </div>
  );
};
