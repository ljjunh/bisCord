import { useState } from 'react';
import { Servers } from '@/features/server/model/types';
import ChMessage from '@/features/channel/ui/ChMessage';
import { ChannelMemberList } from '@/features/server/ui/ChannelMember';
import { MessageHeader } from '@/features/server/ui/MessageHeader';
import { MessageInput } from '@/features/server/ui/MessageInput';
import ChannelMessageDefault from '@/shared/ui/ChannelMessageDefault';

// import { MessageBox } from '@/shared/ui/MessageBox';

interface ChannelMessage {
  server: Servers | undefined;
}

const ChannelMessage = ({ server }: ChannelMessage) => {
  const [message, setMessage] = useState<string>('');
  const [allMessage, setAllMessage] = useState<string[]>([]);
  console.log(allMessage);

  const handleSendMessage = (newMessage: string) => {
    if (newMessage.trim() === '') return;
    setAllMessage((prevMessages) => [...prevMessages, newMessage]);
    setMessage('');
  };

  return (
    <div className="flex h-full w-full flex-grow flex-col bg-mid-gray">
      <MessageHeader serverName={server?.name} />
      <div className="flex w-full flex-grow flex-row overflow-y-scroll scrollbar-hide">
        <div className="flex flex-grow flex-col justify-end">
          <ChannelMessageDefault serverName={server?.name}>
            {/* 여기에 친구초대 버튼 */}
          </ChannelMessageDefault>
          <ChMessage />

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
