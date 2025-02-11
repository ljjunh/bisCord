import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useModalStore } from '@/shared/model/store/modalStore';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { MODAL } from '@/shared/model/constants/modal';
import { ModalContainer } from '@/shared/ui/layout/ModalContainer';
import { serverQueries } from '../../api/queries';
import { FormType, MODAL_FORM_DEFAULT_VALUES, useModalForm } from '../../useModalForm';
import { ModalForm } from '../form';

interface CreateChannelModalProps {
  serverId: string;
}

export const CreateChannelModal = ({ serverId }: CreateChannelModalProps) => {
  const methods = useModalForm({ defaultValues: MODAL_FORM_DEFAULT_VALUES });
  const { type, onCloseModal } = useModalStore((state) => state);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    ...serverQueries.postCreateChannel,
    onSuccess: () => {
      toast.success('채널을 생성했습니다.');
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.channel.detail(serverId),
      });

      methods.reset();
      onCloseModal();
    },
    onError: (error) => {
      console.log(error);
      toast.error('채널 생성에 실패했습니다.');
    },
  });

  const onSubmit = (data: FormType) => {
    const newChannel = {
      serverUri: serverId,
      name: data.channel,
      type: data.type,
      roleId: 1,
    };
    if (newChannel.name === '') {
      return;
    }
    mutate(newChannel);
  };

  return (
    <ModalContainer
      isOpen={type === MODAL.CREATE_CHANNEL}
      onClose={onCloseModal}
      title="채널 만들기"
      description="서버는 나와 친구들이 함께 어울리는 공간입니다. 내 서버를 만들고 대화를 시작해 보세요."
    >
      <ModalForm
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <ModalForm.Radio
          name="type"
          options={[
            { label: '텍스트', value: 'TEXT' },
            { label: '음성', value: 'VOICE' },
          ]}
        />

        <ModalForm.Input
          name="channel"
          label="채널 이름"
        />
        <div className="w-full self-end bg-dark-gray p-4">
          <button
            type="submit"
            className="w-full rounded-md bg-gray p-2 transition-colors hover:bg-blue"
          >
            {isPending ? '채널을 생성중입니다' : '생성하기'}
          </button>
        </div>
      </ModalForm>
    </ModalContainer>
  );
};
