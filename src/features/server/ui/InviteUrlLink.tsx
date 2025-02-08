import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { serverQueries } from '../api/queries';

interface InviteUrlLinkProps {
  validServerId: string;
}

export const InviteUrlLink = ({ validServerId }: InviteUrlLinkProps) => {
  const { data: inviteUrl } = useQuery({
    ...serverQueries.postInvite(validServerId),
  });
  const validInviteUrl = inviteUrl?.inviteUrl.split('/');
  const lastElement = validInviteUrl?.[validInviteUrl.length - 1];

  const handleCopyToClipboard = () => {
    if (lastElement) {
      navigator.clipboard
        .writeText(lastElement)
        .then(() => {
          toast.success('링크를 복사했습니다.');
        })
        .catch((error) => {
          console.error('복사 실패:', error);
        });
    }
  };

  return (
    <div className="flex w-full flex-col gap-2 bg-dark-gray p-4 text-start">
      <p className="text-xs font-semibold text-light-gray">또는 친구에게 서버 초대 링크 전송하기</p>
      <div className="flex w-full items-center justify-between rounded-md bg-black p-1">
        <p>{lastElement}</p>
        <button
          onClick={handleCopyToClipboard}
          className="rounded-md bg-blue px-4 py-2 text-xs transition-all hover:bg-primary"
          type="submit"
        >
          복사
        </button>
      </div>
      <div className="text-xs text-light-gray">초대 링크가 1시간 후에 만료돼요</div>
    </div>
  );
};
