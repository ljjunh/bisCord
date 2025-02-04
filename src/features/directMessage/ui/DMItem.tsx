import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { DMUser } from '../model/types';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { ROUTES } from '@/shared/constants/routes';
import { cn } from '@/shared/lib/utils';
import UserAvatar from '@/shared/ui/UserAvatar';
import { DMQueries } from '../api/queries';

type DirectMessageItemProps = Pick<
  DMUser,
  'userId' | 'name' | 'profileImageURL' | 'loginStatus' | 'read'
>;

export const DMItem = ({
  userId,
  name,
  profileImageURL,
  loginStatus,
  read,
}: DirectMessageItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userDMPath = ROUTES.CHAT.DIRECT_MESSAGE.DETAIL(userId);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    ...DMQueries.deleteDMRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.directMessage.members() });
      toast.success('채팅방을 삭제했습니다');
      if (location.pathname !== ROUTES.ROOT) {
        navigate(ROUTES.ROOT);
      }
    },
  });

  const handleRemove = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    mutate({ recipientId: userId });
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
        <span
          className={cn(
            'text-md ml-3 group-hover:text-white',
            read ? 'text-super-light-gray' : 'text-white',
          )}
        >
          {name}
        </span>
      </div>

      <button
        onClick={handleRemove}
        disabled={isPending}
        className="hidden h-4 w-4 items-center justify-center text-super-light-gray after:content-['×'] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 group-hover:flex"
      />
    </Link>
  );
};
