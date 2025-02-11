import { invariant } from 'es-toolkit/compat';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { Servers } from '../model/types';
import { useModalStore } from '@/shared/model/store/modalStore';
import { queryClient } from '@/shared/api/queryClient';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { MODAL } from '@/shared/model/constants/modal';
import { ModalContainer } from '@/shared/ui/layout/ModalContainer';
import { serverQueries } from '../api/queries';
import { UploadImageInput } from './UploadImageInput';

export const EditServerModal = () => {
  const { type, onCloseModal } = useModalStore((state) => state);
  const serverId = useParams().serverId;
  invariant(serverId, 'Server ID is missing in URL parameters');

  const [imageData, setImageData] = useState<File | string>(''); // 초기값을 빈 문자열로 설정
  const [profileData, setProfileData] = useState<Servers>({
    name: '',
    serverUri: '',
    serverImageURL: '',
  });

  // 현재 서버 정보를 가져옴
  const { data: serverData, refetch } = useQuery({
    ...serverQueries.getServerDetail(serverId),
  });

  // 서버 데이터 설정
  useEffect(() => {
    if (serverData) {
      setProfileData({
        name: serverData.name ?? '',
        serverUri: serverData.serverUri ?? '',
        serverImageURL: serverData.serverImageURL ?? '',
      });
      setImageData(serverData.serverImageURL ?? ''); // 서버 이미지 URL 초기화
    }
  }, [serverData]);

  // 서버 정보 수정 요청
  const { mutate: updateServerProfile } = useMutation({
    ...serverQueries.putEditServer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.server.list(),
      });
      toast.success('서버 수정이 완료되었습니다!');
      refetch();
      onCloseModal();
    },
    onError: () => {
      toast.error('서버 수정에 실패했습니다.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // profileData에 이미지가 있다면 URL로 변경 후 제출
    const updatedProfileData = {
      ...profileData,
      serverImageURL: imageData,
    };

    updateServerProfile(updatedProfileData);
  };

  return (
    <ModalContainer
      isOpen={type === MODAL.EDIT_SERVER}
      onClose={onCloseModal}
      subTitle="서버 개요"
      description=""
    >
      <form
        className="flex w-full flex-col justify-center gap-2 px-2 pb-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center justify-center">
          <UploadImageInput
            onChange={setImageData}
            value={imageData}
          />
          <div className="flex w-[100px] flex-col break-all text-xs text-light-gray">
            서버 이미지 해상도는 최소 512x512를 추천해요.
          </div>
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
        <button
          type="submit"
          className="w-full rounded-md bg-blue p-2"
        >
          수정
        </button>
      </form>
    </ModalContainer>
  );
};
