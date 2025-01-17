import { DirectMessageList } from '@/features/directMessage/ui/DirectMessageList';
import { FriendView } from '@/features/friend/ui/FriendView';
import { useState } from 'react';

const MainPage = () => {
  return (
    <div className="bg-yellow flex h-screen">
      <aside className="max-h-screen">
        <DirectMessageList />
      </aside>
      <main className="flex-1 overflow-hidden">
        <FriendView />
      </main>
    </div>
  );
};

export default MainPage;
