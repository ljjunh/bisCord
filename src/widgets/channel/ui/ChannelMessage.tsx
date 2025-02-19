import { invariant } from 'es-toolkit/compat';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import type { Message } from '@/features/channel/model/types';
import type { Servers } from '@/features/server/model/types';
import { useAuthStore } from '@/shared/model//store/authStore';
import { channelQueries } from '@/features/channel/api/queries';
import { ChMessage } from '@/features/channel/ui/ChMessage';
import { MessageBox } from '@/features/channel/ui/MessageBox';
import { ChannelMemberList } from '@/features/server/ui/ChannelMember';
import { MessageHeader } from '@/features/server/ui/MessageHeader';
import { MessageInput } from '@/features/server/ui/MessageInput';
import { queryClient } from '@/shared/api/queryClient';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { env } from '@/shared/config/env';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import { ChannelMessageDefault } from '@/shared/ui/ChannelMessageDefault';

interface ChannelMessageProps {
  server: Servers | undefined;
}

interface ChatData {
  chatId: string;
  channelId: number;
  content: string;
  userId: number;
  name: string;
  profileImageUrl: string;
  createdAt: string;
  updated: boolean;
}
interface ResChatData {
  data: ChatData;
}

export const ChannelMessage = ({ server }: ChannelMessageProps) => {
  const [allMessage, setAllMessage] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');

  const chId = useParams()['*'];
  invariant(chId, 'Channel ID is missing in URL parameters');
  const ChNumId = Number(chId);

  const [stompClient, setStompClient] = useState<Client | null>(null);

  // store or socket
  const token = useAuthStore((state) => state.accessToken);

  // api client
  const { data, fetchNextPage, refetch, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
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

    const channelClient = new Client({
      brokerURL: env.wsURL,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: (frame) => {
        console.log('channel 연결 성공', frame);
        console.log(allMessage);
        channelClient.subscribe(`/topic/channel/${ChNumId}`, (message: IMessage) => {
          const msg: ResChatData = JSON.parse(message.body);
          console.log(msg.data);
          setAllMessage((prev) => {
            if (!prev.some((m) => m.chatId === msg.data.chatId)) {
              return [msg.data, ...prev];
            }
            return prev;
          });
        });
      },
    });

    channelClient.activate();
    setStompClient(channelClient);

    return () => {
      channelClient.deactivate();
    };
  }, [ChNumId, data, token]);

  // 하....... 진짜 좀.... 뭐가 문제냐고
  const handleSendMessage = (newMessage: string) => {
    if (stompClient) {
      // 메시지 전송 시, content만 전송
      const chatMessage = {
        channelId: ChNumId,
        content: newMessage,
      };
      mutate(chatMessage);
      setMessage('');
      refetch();
    }
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
