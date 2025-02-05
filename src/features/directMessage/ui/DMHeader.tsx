import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DiscordIcon from '@/shared/icons/DiscordIcon';
import { userQueries } from '../../user/api/queries';
import { CallButton } from './CallButton';

export const DMHeader = () => {
  const otherUserId = Number(useParams().id);
  const { data, isLoading } = useQuery({
    ...userQueries.getOtherUser({ userId: otherUserId }),
  });

  if (!data || isLoading) return null;

  return (
    <div className="flex items-center justify-between border-b border-dark-gray px-4 py-3">
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
      <CallButton />
    </div>
  );
};
