import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useModalStore } from '@/shared/model/modalStore';
import { ModalForm } from '@/features/server/ui/form';
import { FormType, MODAL_FORM_DEFAULT_VALUES, useModalForm } from '@/features/server/useModalForm';
import { serverQueries } from '@/entities/server/api/queries';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import PlusIcon from '@/shared/icons/PlusIcon';
import ModalContainer from '@/shared/ui/layout/ModalContainer';

interface CreateServerModal {
  refetch: () => void;
}

const CreateServerModal = ({ refetch }: CreateServerModal) => {
  const methods = useModalForm({ defaultValues: MODAL_FORM_DEFAULT_VALUES });
  const { type, onCloseModal } = useModalStore((state) => state);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    ...serverQueries.postCreateServer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.server.list(),
      });
      methods.reset(); // 폼 초기화
      toast.success('서버를 생성했습니다.');
      refetch();
      onCloseModal();
    },
  });

  const handleCreateServer = (data: FormType) => {
    // 새로운 서버 객체 생성
    const newServer = {
      name: data.server,
      // serverUri: crypto.randomUUID(),
      serverImageURL: '',
    };
    if (newServer.name === '') {
      toast.error('서버 이름을 입력해주세요');
      return;
    }
    console.log(newServer);

    mutate(newServer);
  };

  return (
    <ModalContainer
      isOpen={type === 'CREATE_SERVER'}
      onClose={onCloseModal}
      title="서버를 만들어 보세요"
      description="서버는 나와 친구들이 함께 어울리는 공간입니다. 내 서버를 만들고 대화를 시작해 보세요."
    >
      <ModalForm
        methods={methods}
        onSubmit={methods.handleSubmit(handleCreateServer)}
      >
        <div className="flex w-full items-center justify-center">
          <div className="relative flex aspect-[1/1] w-[30%] cursor-pointer items-center justify-center rounded-[50%] border-2 border-dashed border-light-gray">
            <label className="flex h-full w-full items-center justify-center">
              <div className="absolute right-0 top-0 rounded-[50%] bg-blue p-2">
                <PlusIcon
                  size={20}
                  color="#ffffff"
                />
              </div>
              <div className="text-lg font-semibold text-light-gray">UPLOAD</div>
              <input
                type="file"
                className="hidden"
              />
            </label>
          </div>
        </div>
        <ModalForm.Input
          name="server"
          label="서버 이름"
        />
        <div className="flex w-full flex-col gap-4 bg-dark-gray p-4">
          <div className="text-xl font-semibold">서버를 생성 하시겠습니까?</div>
          <button
            type="submit"
            className="w-full rounded-md bg-gray py-2 text-white transition-colors hover:bg-blue"
          >
            서버 생성하기
          </button>
        </div>
      </ModalForm>
    </ModalContainer>
  );
};

export default CreateServerModal;
