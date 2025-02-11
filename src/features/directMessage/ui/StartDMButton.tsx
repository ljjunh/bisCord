import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { ROUTES } from '@/shared/model/constants/routes';
import { DMQueries } from '../api/queries';

interface StartDMButtonProps {
  selectedFriendId: number;
}

export const StartDMButton = ({ selectedFriendId }: StartDMButtonProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    ...DMQueries.postDMRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.directMessage.members() });
      navigate(ROUTES.CHAT.DIRECT_MESSAGE.DETAIL(selectedFriendId));
    },
  });

  const handleButtonClick = () => {
    mutate({ recipientId: selectedFriendId });
  };

  return (
    <button
      onClick={handleButtonClick}
      disabled={isPending}
      className="mt-4 w-full rounded-md bg-blue py-2.5 text-sm font-medium text-white hover:bg-blue-purple disabled:cursor-not-allowed disabled:opacity-50"
    >
      DM 생성
    </button>
  );
};
