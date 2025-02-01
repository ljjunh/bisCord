import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Message } from '@/features/channel/model/types';
import { Servers } from '@/features/server/model/types';
import { useAuthStore } from '@/shared/model/authStore';
import { channelQueries } from '@/features/channel/api/queries';
import ChMessage from '@/features/channel/ui/ChMessage';
import { ChannelMemberList } from '@/features/server/ui/ChannelMember';
import { MessageHeader } from '@/features/server/ui/MessageHeader';
import { MessageInput } from '@/features/server/ui/MessageInput';
import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll';
import ChannelMessageDefault from '@/shared/ui/ChannelMessageDefault';
import { MessageBox } from '@/shared/ui/MessageBox';

interface ChannelMessage {
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

const ChannelMessage = ({ server }: ChannelMessage) => {
  const [allMessage, setAllMessage] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const { '*': channelId } = useParams();
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const token = useAuthStore((state) => state.accessToken);
  const ChNumId = Number(channelId);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    channelQueries.getCHMessages({ channelId: ChNumId }),
  );

  const observerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isLoading: isFetchingNextPage,
  });

  const channelProfile = data?.pages[0].channelProfile;
  // console.log(data);

  useEffect(() => {
    // if (data) {
    //   const newMessages = data.pages.flatMap((page) => page.chats.content);
    //   setAllMessage(newMessages);
    // }

    const channelClient = new Client({
      brokerURL: 'wss://kdt-pt-1-pj-1-team06.elicecoding.com/api/ws',
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: (frame) => {
        console.log('channel 연결 성공', frame);
        channelClient.subscribe(`/topic/channel/${ChNumId}`, (message: IMessage) => {
          const msg: ChatData = JSON.parse(message.body);
          setAllMessage((prev) => [...prev, msg]);
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
        content: newMessage,
      };
      stompClient.publish({
        destination: `/chat/channel/${ChNumId}`,
        body: JSON.stringify(chatMessage),
      });
      setMessage('');
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
