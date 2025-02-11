import { invariant } from 'es-toolkit/compat';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useRTCStore } from '@/shared/model/store/RTCStore';
import { DiscordIcon } from '@/shared/ui/icons/DiscordIcon';
import { userQueries } from '../../user/api/queries';
import { CallButton } from './CallButton';
import { CallView } from './CallView';

export const DMHeader = () => {
  const id = useParams().id;
  invariant(id, 'User ID is missing in URL parameters');
  const otherUserId = Number(id);

  const { data, isLoading } = useQuery({
    ...userQueries.getOtherUser({ userId: otherUserId }),
  });
  const { inComingCall, isCallInProgress } = useRTCStore();

  if (!data || isLoading) return null;

  return (
    <div className="relative flex items-center justify-between border-b border-dark-gray px-4 py-3">
      {(inComingCall || isCallInProgress) && <CallView profileImageURL={data.profileImageURL} />}
      <div className="flex gap-3">
        {/* 프로필 이미지 */}
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue">
          {data?.profileImageURL ? (
            <img
              src={data.profileImageURL}
              alt={`${data.name}의 프로필`}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <DiscordIcon
              size={20}
              color="#fff"
            />
          )}
        </div>

        {/* 유저 정보 */}
        <span className="font-bold text-white">{data.name}</span>
      </div>
      <CallButton otherUserId={otherUserId} />
    </div>
  );
};
