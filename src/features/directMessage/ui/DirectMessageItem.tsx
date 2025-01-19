import type { DirectMessage } from '../model/types';
import { cn } from '@/shared/lib/utils';

interface DirectMessageItemProps {
  name: string;
  status: DirectMessage['status'];
  hasUnread: boolean;
}

export const DirectMessageItem = ({ name, status, hasUnread }: DirectMessageItemProps) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(name, '삭제 요청');
  };

  return (
    <div className="group mx-2 flex cursor-pointer items-center rounded px-2 py-1 hover:bg-mid-gray">
      <div className="flex flex-1 items-center">
        <div className="relative">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm text-white"></div>
          <div
            className={cn(
              'border-gray-800 absolute bottom-0 right-0 h-3 w-3 rounded-full border-2',
              {
                'bg-green': status === 'online',
                'bg-gray': status === 'offline',
                'bg-yellow': status === 'away',
                'bg-red': status === 'busy',
              },
            )}
          />
        </div>
        <span
          className={cn('text-md ml-3 group-hover:text-white', {
            'font-semibold text-white': hasUnread,
            'text-super-light-gray': !hasUnread,
          })}
        >
          {name}
        </span>
      </div>

      <button
        onClick={handleRemove}
        className="hidden h-4 w-4 items-center justify-center text-super-light-gray after:content-['×'] hover:text-white group-hover:flex"
      />
    </div>
  );
};
