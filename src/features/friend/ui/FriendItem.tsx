import { FRIEND_REQUEST_TYPE } from '../model/constants';
import { FriendRequestType } from '../model/types';
import { AcceptFriendButton } from './AcceptFriendButton';
import { IconButton } from './IconButton';
import { FRIEND_LOGIN_STATUS } from '@/entities/friend/model/constants';
import type { Friend } from '@/entities/friend/model/types';
import CloseIcon from '@/shared/icons/CloseIcon';
import { MessageIcon } from '@/shared/icons/MessageIcon';
import { OverflowMenuIcon } from '@/shared/icons/OverflowMenuIcon';
import UserAvatar from '@/shared/ui/UserAvatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

interface FriendItemProps {
  mode: FriendRequestType;
  friend: Friend;
}

export const FriendItem = ({ mode, friend }: FriendItemProps) => {
  const getStatusText = () => {
    if (mode === FRIEND_REQUEST_TYPE.ACCEPTED) {
      return friend.loginStatus === FRIEND_LOGIN_STATUS.LOGIN ? '온라인' : '오프라인';
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
          state={friend.loginStatus === FRIEND_LOGIN_STATUS.LOGIN ? true : false}
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
            <IconButton
              icon={<MessageIcon />}
              tooltipText="메시지 보내기"
              delayDuration={100}
              onClick={() => console.log('DM페이지로 이동')}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <IconButton
                  icon={<OverflowMenuIcon />}
                  tooltipText="기타"
                  delayDuration={100}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => console.log('영상 통화 시작하기')}>
                  영상 통화 시작하기
                </DropdownMenuItem>
                <DropdownMenuItem>음성 통화 시작하기</DropdownMenuItem>
                <DropdownMenuItem className="text-red focus:bg-red">친구 삭제하기</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
        {mode === FRIEND_REQUEST_TYPE.PENDING && friend.status === 'RECEIVED' && (
          <>
            <AcceptFriendButton friendId={friend.id} />
            <IconButton
              icon={<CloseIcon size={16} />}
              tooltipText="거절"
              delayDuration={100}
              hoverColor="red"
              onClick={() => console.log('친구 거절')}
            />
          </>
        )}
        {mode === FRIEND_REQUEST_TYPE.PENDING && friend.status === 'INVITED' && (
          <IconButton
            icon={<CloseIcon size={16} />}
            tooltipText="취소"
            delayDuration={100}
            hoverColor="red"
            onClick={() => console.log('요청 취소')}
          />
        )}
      </nav>
    </article>
  );
};
