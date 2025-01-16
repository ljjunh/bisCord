import type { DirectMessage } from '../model/types';
import { DirectMessageItem } from './DirectMessageItem';

// 임시 데이터
const dummyDMs: DirectMessage[] = [
  { id: 1, name: 'angelvisean#2120', status: 'online', hasUnread: true },
  { id: 2, name: '김정현', status: 'offline', hasUnread: false },
  { id: 3, name: 'Moon', status: 'away', hasUnread: false },
  { id: 4, name: 'apple', status: 'busy', hasUnread: true },
  { id: 5, name: 'banana', status: 'online', hasUnread: true },
  { id: 6, name: '김준현', status: 'offline', hasUnread: false },
  { id: 7, name: '김건희', status: 'away', hasUnread: false },
  { id: 8, name: '김현민', status: 'busy', hasUnread: true },
];

export const DirectMessageList = () => {
  return (
    <div className="flex h-full flex-col bg-dark-gray py-5">
      <div className="mb-2 px-4">
        <h2 className="text-xs text-super-light-gray">다이렉트 메시지</h2>
      </div>
      <div className="flex h-full min-w-64 flex-col space-y-1 overflow-y-auto">
        {dummyDMs.length > 0 &&
          dummyDMs.map((dm) => (
            <DirectMessageItem
              key={dm.id}
              name={dm.name}
              status={dm.status}
              hasUnread={dm.hasUnread}
            />
          ))}
      </div>
    </div>
  );
};
