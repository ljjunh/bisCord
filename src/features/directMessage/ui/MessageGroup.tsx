import type { MessageGroups } from '../model/types';
import { formatMessageDate } from '@/shared/lib/formatMessageDate';

interface MessageGroupProps {
  group: MessageGroups;
}

export const MessageGroup = ({ group }: MessageGroupProps) => {
  return (
    <div className="group py-3">
      <div className="flex items-start">
        {/* 프로필 사진 */}
        <div className="mr-4 h-10 w-10 flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-gray-500" />
        </div>

        <div className="flex-1">
          {/* 이름,  시간 */}
          <div className="mb-1 flex items-center gap-2">
            <span>{group.user.name}</span>
            <span className="text-sm text-super-light-gray">
              {formatMessageDate(group.timestamp)}
            </span>
          </div>

          {/* 메시지들 */}
          <div className="space-y-0.5">
            {group.messages.map((message) => (
              <p key={message.chatId}>{message.content}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
