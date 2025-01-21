import React from 'react';
import { Server } from '@/shared/model/server/types';

interface IServerAvatarProps {
  children?: React.ReactNode;
  search?: boolean;
  server?: Server;
}
/** 좌측 서버 아바타 컴포넌트 */
const ServerAvatar = ({ children, search, server }: IServerAvatarProps) => {
  return (
    <div
      className={`relative flex aspect-[1/1] w-[50px] items-center justify-center overflow-hidden rounded-[50%] bg-gray transition-all duration-300 ease-in-out hover:rounded-xl ${search ? `hover:bg-green` : 'hover:bg-blue'} `}
    >
      {server ? (
        <div className="text-md overflow-hidden text-nowrap break-all text-center text-white">
          {server.name}'s server
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default ServerAvatar;
