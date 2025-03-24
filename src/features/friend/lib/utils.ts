import type { FriendTab } from '../model/types';

export const getTabClassName = (tabId: string, activeTab: FriendTab) => {
  // 활성화된 탭
  if (activeTab === tabId) {
    if (activeTab === 'add') {
      return 'text-green';
    }
    return 'bg-gray-500 text-white';
  }

  // 친구 추가하기 탭
  if (tabId === 'add') {
    return 'bg-dark-green text-white';
  }

  // 기본 탭
  return 'hover:bg-gray-600 text-super-light-gray hover:text-white';
};
