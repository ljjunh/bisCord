import UserAvatar from '@/shared/ui/UserAvatar';

const MemberList = () => {
  return (
    <div className="flex flex-row items-center gap-2">
      <UserAvatar
        size={20}
        state="ONLINE"
      />
      <div className="text-light-gray">멤버 이름</div>
    </div>
  );
};

export default MemberList;
