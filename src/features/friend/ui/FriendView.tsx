import { useState } from 'react';
import type { FriendTab } from '../model/types';
import { SwitchCase } from '@/shared/ui/SwitchCase';
import { AddFriendView } from './AddFriendView';
import { AllFriendsView } from './AllFriendsView';
import { FriendTabs } from './FriendTabs';
import { OnlineFriendsView } from './OnlineFriendsView';
import { PendingFriendsView } from './PendingFriendsView';

// 탭과 콘텐츠를 결합하는 상위 컴포넌트

export const FriendView = () => {
  const [activeTab, setActiveTab] = useState<FriendTab>('online');

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
        <SwitchCase
          value={activeTab}
          caseBy={{
            online: <OnlineFriendsView />,
            all: <AllFriendsView />,
            pending: <PendingFriendsView />,
            add: <AddFriendView />,
          }}
          defaultComponent={<AllFriendsView />}
        />
      </section>
    </main>
  );
};
