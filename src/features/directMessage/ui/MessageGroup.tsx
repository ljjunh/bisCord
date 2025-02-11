import type { MessageGroups } from '../model/types';
import { useAuthStore } from '@/shared/model/store/authStore';
import { formatMessageDate } from '@/shared/lib/utils/formatMessageDate';
import { cn } from '@/shared/lib/utils/utils';
import { DiscordIcon } from '@/shared/ui/icons/DiscordIcon';
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
        <div className="relative mr-4 flex aspect-[1/1] h-10 h-full min-h-[35px] w-10 items-center justify-center rounded-[50%] bg-blue">
          {group.user.profileImageURL ? (
            <img
              src={group.user.profileImageURL}
              width={15}
              height={15}
              alt="User Avatar"
              className="h-full w-full rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/images/discord-icon.svg';
              }}
            />
          ) : (
            <DiscordIcon
              color={'#ffffff'}
              size={20}
            />
          )}
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
                    recipientId={message.recipientId}
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
                          recipientId={message.recipientId}
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
