import { IServerDatas } from '@/entities/types/ChannelType';
import React from 'react';

interface IServerAvatarProps {
  children?: React.ReactNode;
  search?: boolean;
  server?: IServerDatas[];
}
/** 좌측 서버 아바타 컴포넌트 */
const ServerAvatar = ({ children, search, server }: IServerAvatarProps) => {
  return (
    <div
      className={`relative flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-[50%] bg-gray transition-all duration-300 ease-in-out hover:rounded-xl ${search ? `hover:bg-green` : 'hover:bg-blue'} `}
    >
      {children}
    </div>
  );
};

export default ServerAvatar;
