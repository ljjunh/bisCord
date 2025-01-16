import type { FriendTab } from '../model/types';
import { AddFriendView } from './AddFriendView';
import { AllFriendsView } from './AllFriendsView';
import { FriendList } from './FriendList';
import { FriendTabs } from './FriendTabs';
import { OnlineFriendsView } from './OnlineFriendsView';
import { PendingFriendsView } from './PendingFriendsView';
import { useState } from 'react';

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
        return <FriendList friends={[]} />;
    }
  };

  return (
    <div className="flex h-full flex-col bg-mid-gray">
      <FriendTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
};
