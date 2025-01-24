import { PropsWithChildren } from 'react';

interface ChannelMessageDefault {
  serverName: string | undefined;
}

const ChannelMessageDefault = ({
  serverName,
  children,
}: PropsWithChildren<ChannelMessageDefault>) => {
  return (
    <div className="flex w-full py-4">
      <div className="w-50 mx-auto max-w-[350px] break-words text-center">
        <div className="mb-2 text-3xl font-bold text-white">
          {serverName && serverName}님의 서버의 오신것을 환영합니다
        </div>
        <p className="text-light-gray">
          {serverName}의 서버에 오신것을 환영해요. 친구들을 초대해 함께 소통을 및 활동을 해보아요!
        </p>
      </div>
      {children}
    </div>
  );
};

export default ChannelMessageDefault;
