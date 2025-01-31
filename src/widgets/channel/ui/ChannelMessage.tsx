import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Message } from '@/features/channel/model/types';
import { Servers } from '@/features/server/model/types';
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

const ChannelMessage = ({ server }: ChannelMessage) => {
  const [allMessage, setAllMessage] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const { '*': channelId } = useParams();
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

  useEffect(() => {
    if (data) {
      const newMessages = data.pages.flatMap((page) => page.chats.content);
      setAllMessage(newMessages);
    }
  }, [data]);

  const handleSendMessage = (newMessage: string) => {
    if (newMessage.trim() === '') return;
    setMessage('');
  };

  return (
    <div className="flex h-full w-full flex-grow flex-col bg-mid-gray">
      <MessageHeader serverName={channelProfile?.name} />
      <div className="flex w-full flex-grow flex-row overflow-y-scroll scrollbar-hide">
        <div className="flex flex-grow flex-col justify-end">
          <ChannelMessageDefault serverName={server?.name}>
            {/* 여기에 친구초대 버튼 */}
          </ChannelMessageDefault>
          <ChMessage>
            {allMessage &&
              allMessage.map((message) => (
                <div key={message.id}>
                  <MessageBox message={message} />
                </div>
              ))}
            <div
              className="h-1 w-full"
              ref={observerRef}
            ></div>
          </ChMessage>
          <MessageInput
            value={message}
            onChange={setMessage}
            onSubmit={handleSendMessage}
            placeholder={'asdf'}
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
