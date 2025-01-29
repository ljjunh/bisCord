import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Servers } from '../model/types';
import { useModalStore } from '@/shared/model/modalStore';
import useGetParams from '@/entities/hooks/getParams';
import ModalContainer from '@/shared/ui/layout/ModalContainer';
import { serverQueries } from '../api/queries';
import { UploadImageInput } from './UploadImageInput';

const EditServerModal = () => {
  const { type, onCloseModal } = useModalStore((state) => state);
  const { serverId } = useGetParams<{ serverId: string }>(); // `serverId`를 명시적으로 가져오기
  const getServerId = serverId ?? ''; // 기본값 설정
  const [imageData, setImageData] = useState<File | string>('');
  const [profileData, setProfileData] = useState<Servers>({
    name: '',
    serverUri: '',
    serverImageURL: '',
  });

  // 현재 서버 정보를 가져옴
  const { data: serverData } = useQuery({
    ...serverQueries.getServerDetail(getServerId),
  });

  useEffect(() => {
    if (serverData) {
      setProfileData({
        name: serverData.name ?? '',
        serverUri: serverData.serverUri ?? '',
        serverImageURL: serverData.serverImageURL ?? '',
      });
      console.log(profileData);
    }
  }, [serverData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // mutate
  };

  return (
    <ModalContainer
      isOpen={type === 'EDIT_SERVER'}
      onClose={onCloseModal}
      // title="서버 개요"
      subTitle="서버 개요"
      description=""
    >
      <form
        className="flex w-full flex-col gap-2 px-2 pb-4"
        onSubmit={handleSubmit}
      >
        <UploadImageInput
          onChange={setImageData}
          value={imageData}
        />
        <div className="flex w-[100px] flex-col break-all text-xs text-light-gray">
          서버 이미지 해상도는 최소 512x512를 추천해요.
        </div>
        <label className="flex flex-col text-start">
          <span className="pb-1 text-xs text-light-gray">서버 이름</span>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full rounded-md bg-dark-gray px-3 py-2 text-white focus:outline-none"
          />
        </label>
      </form>
    </ModalContainer>
  );
};

export default EditServerModal;
