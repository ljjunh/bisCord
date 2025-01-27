import { PropsWithChildren } from 'react';
import { Friend } from '@/entities/friend/model/types';
import { ServerMemberDTO } from '@/entities/server/model/types';
import UserAvatar from '@/shared/ui/UserAvatar';

interface MemberList extends PropsWithChildren {
  member?: ServerMemberDTO;
  friends?: Friend;
}

const MemberList = ({ member, children, friends }: MemberList) => {
  console.log(member);

  return (
    <div className="flex flex-row items-center gap-2 rounded-md p-1 hover:bg-mid-gray">
      <UserAvatar
        size={20}
        // state={member.loginStatus}
      />
      {member && <div className="text-light-gray">{member.name}</div>}
      {friends && <div className="text-light-gray">{friends.name}</div>}
      {children}
    </div>
  );
};

export default MemberList;
