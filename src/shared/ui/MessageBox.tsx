import { PropsWithChildren } from 'react';
import { formatTime } from '../lib/dayjs';
import UserAvatar from './UserAvatar';

interface Message extends PropsWithChildren {
  message: {
    chatId: string;
    channelId: number;
    content: string;
    userId: number;
    name: string;
    profileImageUrl: string;
    createdAt: string;
    updated: boolean;
  };
}

const MessageBox = ({ message }: Message) => {
  return (
    <div className="flex w-full gap-4 px-4 py-2 hover:bg-dark-gray hover:bg-opacity-40">
      {/* 프로필 부분UI */}
      <div className="h-[46px] w-[46px]">
        <UserAvatar
          size={30}
          image={message.profileImageUrl}
        />
      </div>
      {/* 이름 및 시간 메세지 */}
      <div className="flex flex-col gap-2 text-white">
        <div className="flex items-end gap-2">
          <h2 className="font-bold hover:underline">{message.name}</h2>
          <p className="text-xs text-light-gray">{formatTime(message.createdAt)}</p>
        </div>
        {message.content}
      </div>
    </div>
  );
};

export { MessageBox };
