import { DMHeader } from '@/features/directMessage/ui/DMHeader';
import { DMList } from '@/features/directMessage/ui/DMList';
import { DMView } from '@/features/directMessage/ui/DMView';

const DirectMessagePage = () => {
  return (
    <div className="flex h-screen">
      <aside className="max-h-screen">
        <DMList />
      </aside>
      <main className="flex h-screen w-full flex-col">
        <DMHeader />
        <div className="flex-1 overflow-hidden">
          <DMView />
        </div>
      </main>
    </div>
  );
};

export default DirectMessagePage;
