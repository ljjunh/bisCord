import { useState } from 'react';
import type { FriendTab } from '../model/types';
import { AddFriendView } from './AddFriendView';
import { AllFriendsView } from './AllFriendsView';
import { FriendTabs } from './FriendTabs';
import { OnlineFriendsView } from './OnlineFriendsView';
import { PendingFriendsView } from './PendingFriendsView';

// 탭과 콘텐츠를 결합하는 상위 컴포넌트

export const FriendView = () => {
  const [activeTab, setActiveTab] = useState<FriendTab>('online');

  const renderContent = () => {
    switch (activeTab) {
      case 'online':
        return <OnlineFriendsView />;
      case 'all':
        return <AllFriendsView />;
      case 'pending':
        return <PendingFriendsView />;
      case 'add':
        return <AddFriendView />;
      default:
        return <AllFriendsView />;
    }
  };

  return (
    <main className="flex h-full flex-col bg-mid-gray">
      <FriendTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <section
        aria-live="polite"
        className="flex-1"
      >
        {renderContent()}
      </section>
    </main>
  );
};
