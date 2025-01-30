import { DMList } from '@/features/directMessage/ui/DMList';
import DMMessage from '@/features/directMessage/ui/DMMessage';

const DirectMessagePage = () => {
  return (
    <div className="flex h-full bg-black">
      <DMList />
      <DMMessage />
    </div>
  );
};

export default DirectMessagePage;
