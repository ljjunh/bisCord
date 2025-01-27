import type { DMUser } from '../model/types';
import UserAvatar from '@/shared/ui/UserAvatar';

interface DirectMessageItemProps {
  userId: DMUser['userId'];
  name: DMUser['name'];
  profileImageURL: DMUser['profileImageURL'];
  loginStatus: DMUser['loginStatus'];
}

export const DMItem = ({ name, profileImageURL, loginStatus }: DirectMessageItemProps) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(name, '삭제 요청');
  };

  return (
    <div className="group mx-2 flex cursor-pointer items-center rounded px-2 py-1 hover:bg-mid-gray">
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
    </div>
  );
};
