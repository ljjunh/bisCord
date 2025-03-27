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
    <header className="relative flex items-center justify-between border-b border-dark-gray px-4 py-3">
      {(inComingCall || isCallInProgress) && <CallView profileImageURL={data.profileImageURL} />}
      <section
        className="flex gap-3"
        aria-labelledby="user-name"
      >
        <figure className="flex h-7 w-7 items-center justify-center rounded-full bg-blue">
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
        </figure>

        <h1
          id="user-name"
          className="font-bold text-white"
        >
          {data.name}
        </h1>
      </section>

      <nav aria-label="통화 제어">
        <CallButton otherUserId={otherUserId} />
      </nav>
    </header>
  );
};
