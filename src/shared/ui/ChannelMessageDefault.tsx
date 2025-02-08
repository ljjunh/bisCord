import { PropsWithChildren } from 'react';
import { useModalStore } from '../model/modalStore';
import { ArrowRight } from '../icons/ArrowRight';
import { NewMemberIcon } from '../icons/NewMemberIcon';

interface ChannelMessageDefaultProps extends PropsWithChildren {
  serverName: string | undefined;
}

export const ChannelMessageDefault = ({ serverName, children }: ChannelMessageDefaultProps) => {
  const { onOpenModal } = useModalStore((state) => state);

  const handleClick = () => {
    onOpenModal('INVIDE_MEMBER');
  };

  return (
    <div className="flex w-full flex-col items-center py-4">
      <div className="w-50 mx-auto max-w-[350px] break-words text-center">
        <div className="mb-2 text-3xl font-bold text-white">
          {serverName && serverName}님의 서버의 오신것을 환영합니다
        </div>
        <p className="text-light-gray">
          {serverName}의 서버에 오신것을 환영해요. 친구들을 초대해 함께 소통을 및 활동을 해보아요!
        </p>
      </div>
      <div
        onClick={handleClick}
        className="mt-4 flex w-full max-w-[350px] cursor-pointer items-center rounded-lg bg-dark-gray p-4 transition-all hover:bg-gray"
      >
        <div className="mr-2 rounded-[50%] bg-pink p-2">
          <NewMemberIcon
            size={20}
            color="#fff"
          />
        </div>
        <div className="text-md flex-grow font-semibold text-white">친구 초대하기</div>
        <ArrowRight size={20} />
      </div>
      {children}
    </div>
  );
};
