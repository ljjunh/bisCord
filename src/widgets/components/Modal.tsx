import CloseIcon from '@/shared/icons/CloseIcon';
import PlusIcon from '@/shared/icons/PlusIcon';
import { useServerStore } from '@/shared/model/server/store';
import ReactModal from 'react-modal';
import { useState } from 'react';

interface IModalProps {
  handleModal: () => void;
  isModalOpen: boolean;
}

const Modal = ({ handleModal, isModalOpen }: IModalProps) => {
  const [serverName, setServerName] = useState<string>(''); // 서버 이름 상태
  const addServer = useServerStore((state) => state.addServer); // Store의 addServer 함수

  const handleServerCreate = () => {
    if (!serverName.trim()) {
      alert('서버 이름을 입력해주세요.');
      return;
    }

    // 새로운 서버 객체 생성
    const newServer = {
      id: crypto.randomUUID(),
      name: serverName,
      channelList: [],
    };

    addServer(newServer); // Store에 서버 추가
    setServerName(''); // 입력 필드 초기화
    handleModal(); // 모달 닫기
  };

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={handleModal}
      overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
      className="relative flex min-h-[400px] w-full max-w-md flex-col items-center gap-4 rounded-lg bg-gray pt-4 text-center text-white shadow-lg outline-none"
      ariaHideApp={false} // 이 옵션은 테스트 또는 개발 중에만 사용하세요.
    >
      <div
        className="absolute right-4 top-4 cursor-pointer"
        onClick={handleModal}
      >
        <CloseIcon size={15} />
      </div>
      <div className="px-4">
        <h2 className="text-2xl font-bold">서버를 만들어 보세요</h2>
        <p className="mt-2 text-light-gray">
          서버는 나와 친구들이 함께 어울리는 공간입니다. 내 서버를 만들고 대화를 시작해 보세요.
        </p>
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="relative flex aspect-[1/1] w-[30%] cursor-pointer items-center justify-center rounded-[50%] border-2 border-dashed border-light-gray">
          <div className="absolute right-0 top-0 rounded-[50%] bg-blue p-2">
            <PlusIcon
              size={20}
              color="#ffffff"
            />
          </div>
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
          onClick={handleServerCreate}
          className="w-full rounded-md bg-gray py-2 text-white transition-colors hover:bg-blue"
        >
          서버 생성하기
        </button>
      </div>
    </ReactModal>
  );
};

export default Modal;
