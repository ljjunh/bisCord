import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useModalStore } from '@/shared/model/modalStore';
import useGetParams from '@/entities/hooks/getParams';
import ModalContainer from '@/shared/ui/layout/ModalContainer';
import { serverQueries } from '../api/queries';
import { UploadImageInput } from './UploadImageInput';

const EditServerModal = () => {
  const { type, onCloseModal } = useModalStore((state) => state);
  const { serverId } = useGetParams<{ serverId: string }>(); // `serverId`를 명시적으로 가져오기
  const validServerId = serverId ?? ''; // 기본값 설정
  const [imageData, setImageData] = useState<File | string>('');

  // 현재 서버 정보를 가져옴
  const { data: getServerData } = useQuery({
    ...serverQueries.getServerDetail(validServerId),
    enabled: !!serverId, // serverId가 있을 때만 쿼리 실행
  });
  useEffect(() => {
    if (getServerData?.serverImageURL) {
      setImageData(getServerData.serverImageURL);
    }
  }, [getServerData]);

  return (
    <ModalContainer
      isOpen={type === 'EDIT_SERVER'}
      onClose={onCloseModal}
      title="서버 개요"
      description=""
    >
      <form className="flex w-full flex-row gap-2 px-2 pb-4">
        <UploadImageInput
          onChange={setImageData}
          value={imageData}
        />
        <div className="flex w-[100px] flex-col break-all text-xs text-light-gray">
          서버 이미지 해상도는 최소 512x512를 추천해요.
        </div>
        <label className="flex flex-col text-start">
          <span className="text-xs text-light-gray">서버 이름</span>
          <input
            type="text"
            className="w-full rounded-md bg-dark-gray px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-purple"
          />
        </label>
      </form>
    </ModalContainer>
  );
};

export default EditServerModal;
