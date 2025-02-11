import { useNavigate } from 'react-router-dom';
import { useUnreadMessagesStore } from '@/shared/model/store/unreadMessagesStore';
import { DiscordIcon } from '@/shared/icons/DiscordIcon';
import { cn } from '@/shared/lib/utils/utils';
import { ROUTES } from '@/shared/model/constants/routes';

export const UnreadMessageIndicator = () => {
  const unreadUsers = useUnreadMessagesStore((state) => state.unreadUsers);
  const { removeUnreadUser } = useUnreadMessagesStore();

  const navigate = useNavigate();

  const handleProfileClick = (userId: number) => {
    navigate(ROUTES.CHAT.DIRECT_MESSAGE.DETAIL(userId));
    removeUnreadUser(userId);
  };

  return (
    <div className="mt-2 flex flex-col items-center gap-2">
      {Object.entries(unreadUsers).map(([userId, userInfo]) => (
        <div
          key={userId}
          className="group relative flex items-center px-[15px]"
          onClick={() => handleProfileClick(Number(userId))}
        >
          {/* 왼쪽의 알림 점/바 */}
          <div className="absolute left-0 h-2 w-[6px] rounded-r-full bg-white transition-all duration-200 group-hover:h-[20px]" />

          {/* 프로필 컨테이너 */}
          <div
            className={cn(
              'flex h-[48px] w-[48px] cursor-pointer items-center justify-center overflow-hidden rounded-[50%]',
              !userInfo.profileImage && 'bg-blue transition-all duration-200 hover:rounded-2xl',
            )}
          >
            {userInfo.profileImage ? (
              <img
                src={userInfo.profileImage}
                alt="profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <DiscordIcon
                size={30}
                color="#fff"
              />
            )}
          </div>
          {/* 읽지 않은 메시지 카운트 */}
          {userInfo.unreadCount && (
            <div className="absolute -bottom-1 right-3 flex items-center justify-center rounded-full bg-black p-1 text-xs text-white">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-red">
                {userInfo.unreadCount}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
