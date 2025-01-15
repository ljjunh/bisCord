import { UsersData } from '@/shared/mockData/userData';
import DmProfile from '@/widgets/directMessage/DmProfile';
import DmList from '@/widgets/directMessage/ui/DmList';

const DirectMessagePage = () => {
  return (
    <div className="flex h-full">
      <DmList />
      <div className="flex-grow">채팅 영역</div>
      <div className="hidden lg:block">
        <DmProfile />
      </div>
    </div>
  );
};

export default DirectMessagePage;
