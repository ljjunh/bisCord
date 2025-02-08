import { toast } from 'react-toastify';
import { PropsWithChildren } from 'react';
import { useMutation } from '@tanstack/react-query';
import { channelQueries } from '../api/queries';
import { queryClient } from '../../../shared/api/queryClient';
import { QUERY_KEYS } from '../../../shared/api/queryKeys';
// import { EditIcon } from '../../../shared/icons/EditIcon';
import { WasteBasketIcon } from '../../../shared/icons/WasteBasketIcon';
import { formatTime } from '../../../shared/lib/dayjs';
import UserAvatar from '../../../shared/ui/UserAvatar';

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
  channelId: number;
}

const MessageBox = ({ message, channelId }: Message) => {
  const { mutate } = useMutation({
    ...channelQueries.deleteCHMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.channel.messages(channelId),
      });
      toast.success('메세지를 삭제하였습니다');
    },
  });

  const handleDelete = () => {
    mutate({ channelId, chatId: message.chatId });
  };

  return (
    <div className="group flex w-full gap-4 px-4 py-2 hover:bg-dark-gray hover:bg-opacity-40">
      {/* 프로필 부분UI */}
      <div className="h-[46px] w-[46px]">
        <UserAvatar
          size={30}
          image={message.profileImageUrl}
        />
      </div>
      {/* 이름 및 시간 메세지 */}
      <div className="flex flex-col text-white">
        <div className="flex items-end gap-2">
          <h2 className="font-bold hover:underline">{message.name}</h2>
          <p className="text-xs text-light-gray">{formatTime(message.createdAt)}</p>
        </div>
        {message.content}
      </div>

      <div className="ml-auto hidden group-hover:flex">
        {/* <div className="p-1">
          <EditIcon size={20} />
        </div> */}
        <div
          className="p-1"
          onClick={handleDelete}
        >
          <WasteBasketIcon size={20} />
        </div>
      </div>
    </div>
  );
};

export { MessageBox };
