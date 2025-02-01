import { Link, useLocation } from 'react-router-dom';
import type { DMUser } from '../model/types';
import { ROUTES } from '@/shared/constants/routes';
import { cn } from '@/shared/lib/utils';
import UserAvatar from '@/shared/ui/UserAvatar';

type DirectMessageItemProps = Pick<DMUser, 'userId' | 'name' | 'profileImageURL' | 'loginStatus'>;

export const DMItem = ({ userId, name, profileImageURL, loginStatus }: DirectMessageItemProps) => {
  const location = useLocation();
  const userDMPath = ROUTES.CHAT.DIRECT_MESSAGE.DETAIL(userId);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(name, '삭제 요청');
  };

  return (
    <Link
      to={ROUTES.CHAT.DIRECT_MESSAGE.DETAIL(userId)}
      className={cn(
        'group mx-2 flex cursor-pointer items-center rounded px-2 py-1 hover:bg-mid-gray',
        location.pathname === userDMPath && 'bg-gray',
      )}
    >
      <div className="flex flex-1 items-center">
        <div className="relative">
          <div className="flex h-8 w-8 items-center justify-center rounded-full">
            <UserAvatar
              image={profileImageURL}
              size={20}
              state={loginStatus}
            />
          </div>
        </div>
        <span className="text-md ml-3 text-super-light-gray group-hover:text-white">{name}</span>
      </div>

      <button
        onClick={handleRemove}
        className="hidden h-4 w-4 items-center justify-center text-super-light-gray after:content-['×'] hover:text-white group-hover:flex"
      />
    </Link>
  );
};
