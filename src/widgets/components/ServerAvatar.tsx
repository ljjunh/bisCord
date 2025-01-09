import React from "react";

interface IServerAvatarProps {
  children?: React.ReactNode;
  search?: boolean;
}

const ServerAvatar = ({ children, search }: IServerAvatarProps) => {
  return (
    <div
      className={`flex justify-center items-center w-[50px] h-[50px] relative
        bg-gray rounded-[50%] transition-all duration-300 ease-in-out
        hover:rounded-xl ${search ? `hover:bg-green` : "hover:bg-blue"}
        `}
    >
      {children}
    </div>
  );
};

export default ServerAvatar;
