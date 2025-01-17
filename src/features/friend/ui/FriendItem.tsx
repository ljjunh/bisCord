import { IconButton } from './IconButton';
import type { Friend } from '@/entities/friend/model/types';
import { MessageIcon } from '@/shared/icons/MessageIcon';
import { OverflowMenuIcon } from '@/shared/icons/OverflowMenuIcon';
import { cn } from '@/shared/lib/utils';

interface FriendItemProps {
  friend: Friend;
}

export const FriendItem = ({ friend }: FriendItemProps) => {
  return (
    <div className="group mx-2 flex cursor-pointer items-center gap-4 rounded border-t border-gray bg-mid-gray p-2 hover:bg-gray-700">
      <div className="relative">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dark-gray text-sm text-white">
          {friend.profileImageURL || friend.name.charAt(0)}
        </div>
        <div
          className={cn('absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray', {
            'bg-green': friend.status === 'online',
            'bg-gray': friend.status === 'offline',
            'bg-yellow': friend.status === 'away',
            'bg-red': friend.status === 'busy',
          })}
        />
      </div>
      <div className="flex-1">
        <div className="font-bold text-white">{friend.name}</div>
        {friend.status && <div className="font-regular text-super-light-gray">{friend.status}</div>}
      </div>
      <div className="flex gap-3">
        <IconButton
          icon={<MessageIcon />}
          tooltipText="메시지 보내기"
          delayDuration={100}
          onClick={() => console.log('DM페이지로 이동')}
        />
        <IconButton
          icon={<OverflowMenuIcon />}
          tooltipText="기타"
          delayDuration={100}
          onClick={() => console.log('팝오버 show')}
        />
      </div>
    </div>
  );
};
