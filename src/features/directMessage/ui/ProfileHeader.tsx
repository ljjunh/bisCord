import AddUserIcon from '@/shared/icons/AddUserIcon';
import DottedIcon from '@/shared/icons/DottedIcon';
import UserAvatar from '@/shared/ui/UserAvatar';

interface ProfileHeaderProps {
  color?: string;
  image?: string | null;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ image = null }) => {
  return (
    <div className="relative flex aspect-[7/4] w-full flex-col justify-between p-4 before:absolute before:left-0 before:top-0 before:z-0 before:h-[70%] before:w-full before:bg-blue">
      {/* 프로필 상단 버튼 */}
      <div className="z-20 flex justify-end gap-2">
        <div className="flex aspect-[1/1] w-[30px] items-center justify-center rounded-[50%] bg-dark-gray bg-opacity-70 hover:bg-opacity-100">
          <AddUserIcon
            size={15}
            color="#ffffff"
          />
        </div>
        <div className="flex aspect-[1/1] w-[30px] items-center justify-center rounded-[50%] bg-dark-gray bg-opacity-70 hover:bg-opacity-100">
          <DottedIcon color="#ffffff" />
        </div>
      </div>
      {/* 프로필 아바타 */}
      <div className="z-20 flex aspect-[1/1] w-[30%] rounded-[50%] bg-black p-2">
        <UserAvatar
          size={50}
          image={image}
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
