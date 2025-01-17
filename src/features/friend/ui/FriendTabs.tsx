import { getTabClassName } from '../lib/utils';
import { FRIEND_TABS } from '../model/constants';
import type { FriendTab } from '../model/types';
import { FriendsIcon } from '@/shared/icons/FriendsIcon';
import { cn } from '@/shared/lib/utils';

interface FriendTabsProps {
  activeTab: FriendTab;
  onTabChange: (tab: FriendTab) => void;
}

export const FriendTabs = ({ activeTab, onTabChange }: FriendTabsProps) => {
  return (
    <div className="flex items-center space-x-4 border-b border-dark-gray p-3">
      <span className="text-md flex items-center gap-3 border-r border-gray py-0.5 pl-2 pr-3 font-bold text-white">
        <FriendsIcon />
        친구
      </span>
      {FRIEND_TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'text-md rounded px-2 py-0.5 font-bold',
            getTabClassName(tab.id, activeTab),
          )}
        >
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
