import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { DMList } from '@/features/directMessage/ui/DMList';
import { DMView } from '@/features/directMessage/ui/DMView';

const DirectMessagePage = () => {
  const userId = useParams();

  useEffect(() => {
    console.log(userId);
  });

  return (
    <div className="flex h-screen">
      <aside className="max-h-screen">
        <DMList />
      </aside>
      <main className="flex-1 overflow-hidden">
        <DMView />
      </main>
    </div>
  );
};

export default DirectMessagePage;
