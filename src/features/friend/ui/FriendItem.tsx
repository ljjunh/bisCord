import { FriendRequestType } from '../model/types';
import type { Friend } from '@/entities/friend/model/types';
import { LOGIN_STATUS } from '@/entities/user/model/constants';
import UserAvatar from '@/shared/ui/UserAvatar';
import { FRIEND_REQUEST_TYPE } from '../model/constants';
import { AcceptFriendButton } from './AcceptFriendButton';
import { CancelFriendButton } from './CancelFriendButton';
import { DeclineFriendButton } from './DeclineFriendButton';
import { MoreActionsButton } from './MoreActionsButton';
import { SendMessageButton } from './SendMessageButton';

interface FriendItemProps {
  mode: FriendRequestType;
  friend: Friend;
}

export const FriendItem = ({ mode, friend }: FriendItemProps) => {
  const getStatusText = () => {
    if (mode === FRIEND_REQUEST_TYPE.ACCEPTED) {
      return friend.loginStatus === LOGIN_STATUS.ONLINE ? '온라인' : '오프라인';
    }
    if (mode === FRIEND_REQUEST_TYPE.PENDING) {
      if (friend.status === 'INVITED') {
        return '보낸 친구 요청';
      }
      if (friend.status === 'RECEIVED') {
        return '받은 친구 요청';
      }
    }
  };

  return (
    <article className="group mx-2 flex cursor-pointer items-center gap-4 rounded border-t border-gray bg-mid-gray p-2 hover:bg-gray-700">
      <figure>
        <UserAvatar
          image={friend.profileImageURL}
          size={20}
          state={friend.loginStatus}
        />
      </figure>
      <div className="flex-1">
        <div className="flex gap-2">
          <h3 className="font-bold text-white">{friend.name}</h3>
          <span className="hidden text-super-light-gray group-hover:inline">{friend.email}</span>
        </div>

        <div className="font-regular text-super-light-gray">{getStatusText()}</div>
      </div>
      <nav
        className="flex gap-3"
        aria-label="친구 관련 작업"
      >
        {mode === FRIEND_REQUEST_TYPE.ACCEPTED && (
          <>
            <SendMessageButton friendId={friend.id} />
            <MoreActionsButton userId={friend.id} />
          </>
        )}
        {mode === FRIEND_REQUEST_TYPE.PENDING && friend.status === 'RECEIVED' && (
          <>
            <AcceptFriendButton invitingUserId={friend.id} />
            <DeclineFriendButton userId={friend.id} />
          </>
        )}
        {mode === FRIEND_REQUEST_TYPE.PENDING && friend.status === 'INVITED' && (
          <CancelFriendButton userId={friend.id} />
        )}
      </nav>
    </article>
  );
};
