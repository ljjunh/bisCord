import { toast } from 'react-toastify';
import { useState } from 'react';
import { useModalStore } from '@/shared/model/modalStore';
import { serverService } from '@/entities/server/api/servive';
import PlusIcon from '@/shared/icons/PlusIcon';
import { useDebounce } from '@/shared/lib/useDebounce';
import ModalContainer from '@/shared/ui/layout/ModalContainer';

interface ModalProps {
  onCreate?: () => void;
}

const CreateServerModal = ({ onCreate }: ModalProps) => {
  const [serverName, setServerName] = useState<string>(''); // 서버 이름 상태
  const { type, onCloseModal } = useModalStore((state) => state);
  const debouncedName = useDebounce(serverName);

  const handleCreateServer = () => {
    if (!serverName.trim()) {
      toast.error('서버 이름을 입력해주세요.');
      return;
    }

    // 새로운 서버 객체 생성
    const newServer = {
      name: debouncedName,
      serverUri: crypto.randomUUID(),
      serverImageURL: '',
      // serverChannelList: [],
    };

    // try {
    serverService.addServer(newServer);

    setServerName(''); // 입력 필드 초기화

    onCreate?.();
    onCloseModal(); // 모달 닫기
  };

  return (
    <ModalContainer
      isOpen={type === 'CREATE_SERVER'}
      title="서버를 만들어 보세요"
      description="서버는 나와 친구들이 함께 어울리는 공간입니다. 내 서버를 만들고 대화를 시작해 보세요."
      onClose={onCloseModal}
    >
      <div className="flex w-full items-center justify-center">
        <div className="relative flex aspect-[1/1] w-[30%] cursor-pointer items-center justify-center rounded-[50%] border-2 border-dashed border-light-gray">
          <div className="absolute right-0 top-0 rounded-[50%] bg-blue p-2">
            <PlusIcon
              size={20}
              color="#ffffff"
            />
          </div>
          {/* <input type="file" /> */}
          <div className="text-lg font-semibold text-light-gray">UPLOAD</div>
        </div>
      </div>
      <div className="flex h-full w-full flex-grow flex-col items-start gap-2 px-4">
        <label className="text-xs font-semibold text-light-gray">서버 이름</label>
        <input
          type="text"
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
          className="w-full rounded-md bg-black p-2 text-lg text-white outline-none"
        />
      </div>
      <div className="flex w-full flex-col gap-4 bg-dark-gray p-4">
        <div className="text-xl font-semibold">서버를 생성 하시겠습니까?</div>
        <button
          onClick={handleCreateServer}
          className="w-full rounded-md bg-gray py-2 text-white transition-colors hover:bg-blue"
        >
          서버 생성하기
        </button>
      </div>
    </ModalContainer>
  );
};

export default CreateServerModal;
