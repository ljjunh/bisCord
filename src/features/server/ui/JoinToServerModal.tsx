import { toast } from 'react-toastify';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { MODAL, useModalStore } from '@/shared/model/modalStore';
import { queryClient } from '@/shared/api/queryClient';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import ModalContainer from '@/shared/ui/layout/ModalContainer';
import { serverQueries } from '../api/queries';

export const JoinToServerModal = () => {
  const { type, onCloseModal } = useModalStore((state) => state);
  const [inviteKey, setInviteKey] = useState('');

  const { mutate } = useMutation({
    ...serverQueries.postJoin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.server.list(),
      });
      toast.success('서버에 가입되었습니다');
      onCloseModal();
    },
    onError: () => {
      toast.error('잘못된 초대코드 입니다');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteKey.trim()) {
      mutate({ inviteKey });
    } else {
      toast.error('잘못된 초대코드 입니다');
    }
  };

  return (
    <ModalContainer
      isOpen={type === MODAL.JOIN_SERVER}
      title="서버에 가입하기"
      description="친구에게 전달받은 가입 코드로 서버에 참가해보아요"
      onClose={onCloseModal}
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-2"
      >
        <label className="flex flex-col px-4 text-start">
          <span className="pb-2 text-xs font-semibold text-light-gray">초대코드</span>
          <input
            value={inviteKey}
            onChange={(e) => setInviteKey(e.target.value)}
            type="text"
            className={`w-full rounded-md bg-dark-gray px-3 py-2 text-white focus:outline-none`}
          />
        </label>
        <div className="w-full bg-dark-gray p-4">
          <div className="pb-2">서버에 가입 하시겠습니까?</div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue p-2"
          >
            가입하기
          </button>
        </div>
      </form>
    </ModalContainer>
  );
};
