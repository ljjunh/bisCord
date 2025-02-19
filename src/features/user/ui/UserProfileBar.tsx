import { useState } from 'react';
import { useAuthStore } from '@/shared/model/store/authStore';
import { LOGIN_STATUS_LABEL } from '@/entities/user/model/constants';
import { UserAvatar } from '@/shared/ui/UserAvatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { AudioToggleButton } from './AudioToggleButton';
import { MicToggleButton } from './MicToggleButton';
import { UserProfileCard } from './UserProfileCard';

export const UserProfileBar = () => {
  const user = useAuthStore((state) => state.user);
  const currentStatus = user?.loginStatus ?? 'OFFLINE';

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  return (
    <div className="flex h-8 w-full items-center justify-between">
      <DropdownMenu
        open={isDropdownOpen}
        onOpenChange={setIsDropdownOpen}
      >
        <DropdownMenuTrigger asChild>
          <div className="group flex flex-1 cursor-pointer items-center gap-2 rounded-sm hover:bg-mid-gray">
            <div className="h-[35px] w-[35px]">
              <UserAvatar
                size={20}
                image={user?.profileImageURL}
                state={currentStatus}
                bg="light-gray"
              />
            </div>
            <div className="w-full">
              <div className="font-bold text-white">{user?.name}</div>
              <div className="relative h-4 overflow-hidden">
                <div className="absolute transition-transform duration-200 group-hover:-translate-y-full">
                  <span className="block text-xs leading-4 text-super-light-gray">
                    {LOGIN_STATUS_LABEL[currentStatus]}
                  </span>
                </div>
                <div className="absolute translate-y-full transition-transform duration-200 group-hover:translate-y-0">
                  <span className="block text-xs leading-4 text-super-light-gray">
                    {user?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={15}
        >
          <UserProfileCard onCloseDropdown={setIsDropdownOpen} />
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex">
        <MicToggleButton
          isMuted={isMicMuted}
          onToggle={() => setIsMicMuted((prev) => !prev)}
        />
        <AudioToggleButton
          isMuted={isAudioMuted}
          onToggle={() => setIsAudioMuted((prev) => !prev)}
        />
      </div>
    </div>
  );
};
