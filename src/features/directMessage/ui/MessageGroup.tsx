import type { MessageGroups } from '../model/types';
import { useAuthStore } from '@/shared/model/store/authStore';
import { formatMessageDate } from '@/shared/lib/utils/dayjs';
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
    <article className="py-3">
      <div className="flex items-start">
        <figure className="relative mr-4 flex aspect-[1/1] h-10 h-full min-h-[35px] w-10 items-center justify-center rounded-[50%] bg-blue">
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
        </figure>

        <div className="flex-1">
          <header className="mb-1 flex items-center gap-2">
            <h3>{group.user.name}</h3>
            <time
              className="text-sm text-super-light-gray"
              dateTime={group.timestamp}
            >
              {formatMessageDate(group.timestamp)}
            </time>
          </header>

          {/* 메시지들 */}
          <ul className="space-y-0.5">
            {group.messages.map((message) => (
              <li
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};
