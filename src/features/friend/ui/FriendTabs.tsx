import type { FriendTab } from '../model/types';
import { cn } from '@/shared/lib/utils/utils';
import { FriendsIcon } from '@/shared/ui/icons/FriendsIcon';
import { FRIEND_TABS } from '../model/constants';
import { getTabClassName } from '../lib/utils';

interface FriendTabsProps {
  activeTab: FriendTab;
  onTabChange: (tab: FriendTab) => void;
}

export const FriendTabs = ({ activeTab, onTabChange }: FriendTabsProps) => {
  return (
    <nav
      aria-label="친구 목록 탭"
      className="flex items-center space-x-4 border-b border-dark-gray p-3"
    >
      <h1 className="text-md flex items-center gap-3 border-r border-gray py-0.5 pl-2 pr-3 font-bold text-white">
        <FriendsIcon />
        친구
      </h1>
      {FRIEND_TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          id={`${tab.id}-tab`}
          className={cn(
            'text-md rounded px-2 py-0.5 font-bold',
            getTabClassName(tab.id, activeTab),
          )}
        >
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};
