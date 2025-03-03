import { Suspense, lazy, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useModalStore } from '@/shared/model/store/modalStore';
import { cn } from '@/shared/lib/utils/utils';
import { MODAL } from '@/shared/model/constants/modal';
import { EmptyList } from '@/shared/ui/EmptyList';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { ModalSkeleton } from '@/shared/ui/skeleton/ModalSkeleton';
import { serverQueries } from '../api/queries';
import { ArrowDown } from '../../../shared/ui/icons/ArrowDown';
import { ArrowRight } from '../../../shared/ui/icons/ArrowRight';
import { ChannelAddBtn } from './ChannelAddBtn';
import { ChannelItem } from './ChannelItem';

const CreateChannelModal = lazy(() => import('./modals/CreateChannelModal'));

interface ChannelCategoriesProps {
  serverId: string;
}

export const ChannelCategories = ({ serverId }: ChannelCategoriesProps) => {
  const [listOpen, setListOpen] = useState<boolean>(true);
  const [voiceListOpen, setVoiceListOpen] = useState<boolean>(true);
  const { onOpenModal } = useModalStore((state) => state);

  const { data: getChannels } = useQuery({ ...serverQueries.getChannels(serverId) });
  const textChannels = getChannels?.content.filter((channel) => channel.type === 'TEXT');
  const voiceChannels = getChannels?.content.filter((channel) => channel.type === 'VOICE');

  return (
    <div className="flex flex-grow flex-col px-2">
      <Suspense fallback={<ModalSkeleton />}>
        <CreateChannelModal serverId={serverId} />
      </Suspense>
      <div className="flex cursor-pointer items-center py-1 text-light-gray hover:text-white">
        <div
          className="flex flex-grow gap-2"
          onClick={() => setListOpen((prev) => !prev)}
        >
          <div className="flex w-[15px] items-center justify-center">
            {listOpen ? <ArrowDown size={12} /> : <ArrowRight size={12} />}
          </div>
          <div className={cn('flex-grow text-xs', listOpen && 'text-white')}>채팅 채널</div>
        </div>
        <ChannelAddBtn
          locate="right"
          text="채널 추가하기"
          handleModal={() => onOpenModal(MODAL.CREATE_CHANNEL)}
          icon={<PlusIcon size={10} />}
        />
      </div>

      {/* map으로 채널 리스트 작성 */}
      {listOpen ? (
        textChannels ? (
          <div className="flex flex-col gap-1 py-2">
            {textChannels.map((channel) => (
              <ChannelItem
                type="chat"
                key={channel.id}
                link={serverId}
                channel={channel}
              />
            ))}
          </div>
        ) : (
          <EmptyList />
        )
      ) : (
        <></>
      )}
      <div className="flex cursor-pointer items-center py-1 text-light-gray hover:text-white">
        <div
          className="flex flex-grow gap-2"
          onClick={() => setVoiceListOpen((prev) => !prev)}
        >
          <div className="flex w-[15px] items-center justify-center">
            {voiceListOpen ? <ArrowDown size={12} /> : <ArrowRight size={12} />}
          </div>
          <div className={cn('flex-grow text-xs', listOpen && 'text-white')}>음성 채널</div>
        </div>
        <ChannelAddBtn
          locate="right"
          text="채널 추가하기"
          handleModal={() => onOpenModal(MODAL.CREATE_CHANNEL)}
          icon={<PlusIcon size={10} />}
        />
      </div>
      {voiceListOpen ? (
        voiceChannels ? (
          <div className="flex flex-col gap-1 py-2">
            {voiceChannels.map((channel) => (
              <ChannelItem
                type="voice"
                key={channel.id}
                link={serverId}
                channel={channel}
              />
            ))}
          </div>
        ) : (
          <EmptyList />
        )
      ) : (
        <></>
      )}
    </div>
  );
};
