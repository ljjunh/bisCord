import React from "react";

interface IServerAvatarProps {
  children?: React.ReactNode;
  search?: boolean;
}

const ServerAvatar = ({ children, search }: IServerAvatarProps) => {
  return (
    <div
      className={`flex justify-center items-center w-[50px] h-[50px] bg-gray rounded-full hover:rounded-xl transition-all ${
        search ? `hover:bg-green` : "hover:bg-primary"
      }`}
    >
      {children}
    </div>
  );
};

export default ServerAvatar;
