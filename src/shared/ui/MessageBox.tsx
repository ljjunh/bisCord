import { PropsWithChildren } from 'react';
import UserAvatar from './UserAvatar';

interface MessageBoxProps extends PropsWithChildren {
  text: string;
}

const MessageBox = ({ text }: MessageBoxProps) => {
  return (
    <div className="flex w-full gap-4 px-4 py-2">
      {/* 프로필 부분UI */}
      <div className="h-[46px] w-[46px]">
        <UserAvatar size={30} />
      </div>
      {/* 이름 및 시간 메세지 */}
      <div className="flex flex-col text-white">
        <div className="flex items-end gap-2">
          <h2 className="font-bold">이름</h2>
          <p className="text-xs text-light-gray">오늘 오후 6:54</p>
        </div>
        {text}
      </div>
    </div>
  );
};

export { MessageBox };
