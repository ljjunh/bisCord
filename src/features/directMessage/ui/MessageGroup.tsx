import type { MessageGroups } from '../model/types';
import { useAuthStore } from '@/shared/model/authStore';
import { formatMessageDate } from '@/shared/lib/formatMessageDate';
import { cn } from '@/shared/lib/utils';
import { DeleteDMButton } from './DeleteDMButton';
import { EditDMButton } from './EditDMButton';
import { EditDMForm } from './EditDMForm';

interface MessageGroupProps {
  group: MessageGroups;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
}

export const MessageGroup = ({ group, editingId, setEditingId }: MessageGroupProps) => {
  const userId = useAuthStore((state) => state.user?.id);

  return (
    <div className="py-3">
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
              <div
                className={cn(
                  'group flex justify-between py-0.5 pr-4',
                  editingId === null && 'hover:bg-dark-gray',
                )}
                key={message.chatId}
              >
                {editingId === message.chatId ? (
                  <EditDMForm
                    content={message.content}
                    chatId={message.chatId}
                    recipientId={message.userId}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <>
                    <p>{message.content}</p>
                    {userId === message.userId && (
                      <div className="flex hidden gap-2 group-hover:flex">
                        <EditDMButton onEdit={() => setEditingId(message.chatId)} />
                        <DeleteDMButton
                          chatId={message.chatId}
                          recipientId={message.userId}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
