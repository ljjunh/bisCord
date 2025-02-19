import { useAuthStore } from '@/shared/model/store/authStore';
import { useModalStore } from '@/shared/model/store/modalStore';
import { MODAL } from '@/shared/model/constants/modal';
import { UserAvatar } from '@/shared/ui/UserAvatar';
import { EditIcon } from '@/shared/ui/icons/EditIcon';
import { SignOutButton } from '../../auth/ui/SignOutButton';
import { WithdrawButton } from '../../auth/ui/WithdrawButton';
import { UserStatusMenu } from './UserStatusMenu';

interface UserProfileCardProps {
  onCloseDropdown: (value: boolean) => void;
}

export const UserProfileCard = ({ onCloseDropdown }: UserProfileCardProps) => {
  const user = useAuthStore((state) => state.user);
  const onOpenModal = useModalStore((state) => state.onOpenModal);
  const currentStatus = user?.loginStatus ?? 'OFFLINE';

  const handleModal = () => {
    onOpenModal(MODAL.USER_PROFILE);
    onCloseDropdown(false);
  };

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
        <button
          onClick={handleModal}
          className="flex w-full items-center gap-2 px-2 py-1 text-left hover:rounded hover:bg-mid-gray hover:text-white"
        >
          <EditIcon size={14} />
          프로필 편집
        </button>
        <div className="h-px bg-mid-gray" />
        <UserStatusMenu />
      </div>

      <div className="mt-3 rounded bg-dark-gray px-2 py-2 text-sm font-bold text-red">
        <WithdrawButton />
      </div>

      <div className="mt-3 rounded bg-dark-gray px-2 py-2 text-sm font-bold text-red">
        <SignOutButton />
      </div>
    </div>
  );
};
