import { useState } from 'react';
import { useAuthStore } from '@/shared/model/authStore';
import UserAvatar from '@/shared/ui/UserAvatar';
import { AudioToggleButton } from './AudioToggleButton';
import { MicToggleButton } from './MicToggleButton';
import { UserSettingsButton } from './UserSettingsButton';

export const UserProfileBar = () => {
  const user = useAuthStore((state) => state.user);
  const [isMicMuted, setIsMicMuted] = useState(true);
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  return (
    <div className="flex h-8 w-full items-center justify-between">
      <div className="group flex flex-1 items-center gap-2 rounded-sm hover:bg-mid-gray">
        <UserAvatar
          size={20}
          image={user?.profileImageURL}
          state
        />
        <div>
          <div className="font-bold text-white">{user?.name}</div>
          <div className="relative h-4 overflow-hidden">
            <div className="absolute transition-transform duration-200 group-hover:-translate-y-full">
              <span className="block text-xs leading-4 text-super-light-gray">온라인</span>
            </div>
            <div className="absolute translate-y-full transition-transform duration-200 group-hover:translate-y-0">
              <span className="block text-xs leading-4 text-super-light-gray">{user?.email}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <MicToggleButton
          isMuted={isMicMuted}
          onToggle={() => setIsMicMuted((prev) => !prev)}
        />
        <AudioToggleButton
          isMuted={isAudioMuted}
          onToggle={() => setIsAudioMuted((prev) => !prev)}
        />
        <UserSettingsButton />
      </div>
    </div>
  );
};
