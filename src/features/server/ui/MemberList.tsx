import { PropsWithChildren, useEffect } from 'react';
import { ServerMemberDTO } from '../model/types';
import { Friend } from '@/entities/friend/model/types';
import { UserAvatar } from '@/shared/ui/UserAvatar';

interface MemberList extends PropsWithChildren {
  member?: ServerMemberDTO;
  friends?: Friend;
  fetchNextPage?: () => void;
  hasNextPage?: boolean | undefined;
  isLoading?: boolean;
}

export const MemberList = ({ member, children, friends }: MemberList) => {
  useEffect(() => {}, [member, friends]);

  return (
    <div className="flex max-h-[40px] flex-row items-center gap-2 rounded-md p-1 hover:bg-mid-gray">
      <div className="h-[35px]">
        <UserAvatar
          size={20}
          image={friends ? friends?.profileImageURL : member?.profileImageURL}
          state={friends ? friends?.loginStatus : member?.loginStatus}
        />
      </div>
      {member && <div className="text-light-gray">{member.name}</div>}
      {friends && <div className="text-light-gray">{friends.name}</div>}
      {children}
    </div>
  );
};

export default MemberList;
