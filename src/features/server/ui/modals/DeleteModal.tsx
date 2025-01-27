import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Servers } from '@/entities/server/model/types';
import { useModalStore } from '@/shared/model/modalStore';
import { serverQueries } from '@/entities/server/api/queries';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import ModalContainer from '@/shared/ui/layout/ModalContainer';
import { FormType, MODAL_FORM_DEFAULT_VALUES, useModalForm } from '../../useModalForm';
import { ModalForm } from '../form';

interface DeleteModal {
  getServerData: Servers | undefined;
  serverUri?: string | undefined;
}

const DeleteModal = ({ getServerData }: DeleteModal) => {
  const methods = useModalForm({ defaultValues: MODAL_FORM_DEFAULT_VALUES });
  const { type, onCloseModal } = useModalStore((state) => state);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    ...serverQueries.deleteServer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.server.list(),
        // enabled: !!getServerData?.serverUri,
      });
      methods.reset();
      toast.success('서버를 삭제했습니다.');
      onCloseModal();
    },
    onError: () => {
      toast.error('서버 삭제에 실패했습니다.');
    },
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const serverInputValue = methods.watch('server');

  useEffect(() => {
    if (serverInputValue?.trim() === getServerData?.name) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [isButtonDisabled, serverInputValue]);

  // 모달 submit
  const onSubmit = (data: FormType) => {
    if (data.server === getServerData?.name) {
      mutate(getServerData.serverUri);
    } else {
      toast.error('서버 이름을 맞게 입력해주세요.');
    }
  };

  return (
    <ModalContainer
      isOpen={type === 'DELETE_SERVER'}
      onClose={onCloseModal}
      title={`'${getServerData?.name}님의 서버' 삭제`}
      description=""
    >
      <ModalForm
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="w-full px-4">
          <div className="h-full w-full rounded-md bg-yellow p-2 text-start">
            정말 <span className="font-bold">{getServerData?.name}</span>님의 서버를 삭제하시겠어요?
            삭제된 채널은 복구할 수 없어요.
          </div>
        </div>
        <ModalForm.Input
          name="server"
          label="삭제할 서버 이름을 입력하세요"
        />
        <div className="flex w-full justify-end gap-2 self-end bg-dark-gray p-4">
          <button
            onClick={onCloseModal}
            className="h-[45px] w-[80px] rounded-md hover:underline"
          >
            취소
          </button>
          <button
            type="submit"
            className="w-[150px] rounded-md bg-red p-2 transition-colors hover:bg-red"
          >
            서버 삭제
          </button>
        </div>
      </ModalForm>
    </ModalContainer>
  );
};

export default DeleteModal;
