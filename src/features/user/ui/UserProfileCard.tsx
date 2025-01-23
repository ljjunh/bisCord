import { useAuthStore } from '@/shared/model/authStore';
import { EditIcon } from '@/shared/icons/EditIcon';
import UserAvatar from '@/shared/ui/UserAvatar';
import { SignOutButton } from '../../auth/ui/SignOutButton';
import { UserStatusMenu } from './UserStatusMenu';

export const UserProfileCard = () => {
  const user = useAuthStore((state) => state.user);
  const currentStatus = user?.loginStatus ?? 'OFFLINE';

  return (
    <div className="w-80 rounded-md bg-[#000000] p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="h-16 w-16">
          <UserAvatar
            size={40}
            image={user?.profileImageURL}
            state={currentStatus}
          />
        </div>
        <div>
          <div className="font-bold text-white">{user?.name}</div>
          <div className="text-sm text-super-light-gray">{user?.email}</div>
        </div>
      </div>
      <div className="space-y-1 rounded bg-dark-gray px-2 py-2 text-sm font-bold text-super-light-gray">
        <button className="flex w-full items-center gap-2 px-2 py-1 text-left hover:rounded hover:bg-mid-gray hover:text-white">
          <EditIcon size={14} />
          프로필 편집
        </button>
        <div className="h-px bg-mid-gray" />
        <UserStatusMenu />
      </div>

      <div className="mt-3 rounded bg-dark-gray px-2 py-2 text-sm font-bold text-red">
        <SignOutButton />
      </div>
    </div>
  );
};
