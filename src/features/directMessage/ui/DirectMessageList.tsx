import { isEmpty } from 'es-toolkit/compat';
import type { DirectMessage } from '../model/types';
import { UserProfileBar } from '../../user/ui/UserProfileBar';
import { DirectMessageItem } from './DirectMessageItem';

// 임시 데이터
const dummyDMs: DirectMessage[] = [
  { id: 1, name: 'angelvisean#2120', status: 'ONLINE', hasUnread: true },
  { id: 2, name: '김정현', status: 'OFFLINE', hasUnread: false },
  { id: 3, name: 'Moon', status: 'AWAY', hasUnread: false },
  { id: 4, name: 'apple', status: 'BUSY', hasUnread: true },
  { id: 5, name: 'banana', status: 'ONLINE', hasUnread: true },
  { id: 6, name: '김준현', status: 'OFFLINE', hasUnread: false },
  { id: 7, name: '김건희', status: 'AWAY', hasUnread: false },
  { id: 8, name: '김현민', status: 'BUSY', hasUnread: true },
  { id: 9, name: 'angelvisean#2120', status: 'ONLINE', hasUnread: true },
  { id: 10, name: '김정현', status: 'OFFLINE', hasUnread: false },
  { id: 11, name: 'Moon', status: 'AWAY', hasUnread: false },
  { id: 12, name: 'apple', status: 'BUSY', hasUnread: true },
  { id: 13, name: 'banana', status: 'ONLINE', hasUnread: true },
  { id: 14, name: '김준현', status: 'OFFLINE', hasUnread: false },
  { id: 15, name: '김건희', status: 'AWAY', hasUnread: false },
  { id: 16, name: '김현민', status: 'BUSY', hasUnread: true },
  { id: 17, name: 'angelvisean#2120', status: 'ONLINE', hasUnread: true },
  { id: 18, name: '김정현', status: 'OFFLINE', hasUnread: false },
  { id: 19, name: 'Moon', status: 'AWAY', hasUnread: false },
  { id: 20, name: 'apple', status: 'BUSY', hasUnread: true },
  { id: 21, name: 'banana', status: 'ONLINE', hasUnread: true },
  { id: 22, name: '김준현', status: 'OFFLINE', hasUnread: false },
  { id: 23, name: '김건희', status: 'AWAY', hasUnread: false },
  { id: 24, name: '김현민', status: 'BUSY', hasUnread: true },
];

export const DirectMessageList = () => {
  return (
    <div className="flex h-full flex-col bg-dark-gray pt-5">
      <div className="flex-1 overflow-y-auto">
        <div className="mb-2 px-4">
          <h2 className="text-xs text-super-light-gray">다이렉트 메시지</h2>
        </div>
        <div className="flex h-full min-w-64 flex-col space-y-1">
          {!isEmpty(dummyDMs) &&
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
      <div className="bg-black px-2 py-3">
        <UserProfileBar />
      </div>
    </div>
  );
};
