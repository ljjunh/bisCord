import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { Message } from '@/features/channel/model/types';
import { Servers } from '@/features/server/model/types';
import { useAuthStore } from '@/shared/model/authStore';
import { useSocketStore } from '@/shared/model/chSocketStore';
import { channelQueries } from '@/features/channel/api/queries';
import ChMessage from '@/features/channel/ui/ChMessage';
import { MessageBox } from '@/features/channel/ui/MessageBox';
import { ChannelMemberList } from '@/features/server/ui/ChannelMember';
import { MessageHeader } from '@/features/server/ui/MessageHeader';
import { MessageInput } from '@/features/server/ui/MessageInput';
import { queryClient } from '@/shared/api/queryClient';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll';
import ChannelMessageDefault from '@/shared/ui/ChannelMessageDefault';

interface ChannelMessage {
  server: Servers | undefined;
}

const ChannelMessage = ({ server }: ChannelMessage) => {
  const [allMessage, setAllMessage] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const { '*': channelId } = useParams();
  const ChNumId = Number(channelId);
  const token = useAuthStore((state) => state.accessToken);

  // Zustand에서 WebSocket 관리
  // const stompClient = useSocketStore((state) => state.stompClient);
  const connectSocket = useSocketStore((state) => state.connectSocket);
  const disconnectSocket = useSocketStore((state) => state.disconnectSocket);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...channelQueries.getCHMessages({ channelId: ChNumId }),
  });
  const channelProfile = data?.pages[0].channelProfile;

  const { mutate } = useMutation({
    ...channelQueries.postCHSendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.channel.messages(ChNumId),
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const observerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isLoading: isFetchingNextPage,
  });

  useEffect(() => {
    if (data) {
      const newMessages = data.pages.flatMap((page) => page.chats.content);
      setAllMessage(newMessages);
    }

    // 컴포넌트 마운트 시 WebSocket 연결
    connectSocket(token, ChNumId, setAllMessage);

    return () => {
      // 컴포넌트 언마운트 시 WebSocket 연결 해제
      disconnectSocket();
    };
  }, [ChNumId, data, disconnectSocket]);

  // 여기선 그냥 rest로 post만 처리
  const handleSendMessage = (newMessage: string) => {
    if (!newMessage.trim()) return; // 빈값 가드
    const chatMessage = {
      channelId: ChNumId,
      content: newMessage,
    };
    mutate(chatMessage);
    setMessage('');
  };

  return (
    <div className="flex h-full w-full flex-grow flex-col bg-mid-gray">
      <MessageHeader serverName={channelProfile?.name} />
      <div className="flex w-full flex-grow flex-row overflow-y-scroll scrollbar-hide">
        <div className="flex flex-grow flex-col justify-end">
          <ChMessage channelId={ChNumId}>
            {allMessage &&
              allMessage.map((message) => (
                <MessageBox
                  channelId={ChNumId}
                  message={message}
                  key={message.chatId}
                />
              ))}
            <ChannelMessageDefault serverName={server?.name} />
            <div
              className="h-1 w-full"
              ref={observerRef}
            ></div>
          </ChMessage>
          <MessageInput
            value={message}
            onChange={setMessage}
            onSubmit={handleSendMessage}
            placeholder={channelProfile?.name}
          />
        </div>
        <div className="hidden h-full lg:block">
          <ChannelMemberList serverUri={server?.serverUri} />
        </div>
      </div>
    </div>
  );
};

export default ChannelMessage;
