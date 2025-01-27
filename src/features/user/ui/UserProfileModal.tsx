import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { UserProfile } from '@/entities/user/model/types';
import { useAuthStore } from '@/shared/model/authStore';
import { useModalStore } from '@/shared/model/modalStore';
import { userQueries } from '@/entities/user/api/queries';
import ModalContainer from '@/shared/ui/layout/ModalContainer';
import { userQueries as userMutations } from '../api/queries';
import { UserImageUploader } from './UserImageUploader';

export const UserProfileModal = () => {
  const { type, onCloseModal } = useModalStore((state) => state);
  const { user, setAuth } = useAuthStore((state) => state);
  const [profileData, setProfileData] = useState<UserProfile>({
    name: '',
    description: '',
    image: '',
  });

  const { data: userData, refetch } = useQuery({
    ...userQueries.getUser(),
  });

  useEffect(() => {
    if (userData) {
      setProfileData({
        name: userData.name ?? '',
        description: userData.description ?? '',
        image: userData.profileImageURL ?? '',
      });
    }
  }, [userData]);

  const { mutate } = useMutation({
    ...userMutations.putUserProfile,
    onSuccess: (updatedFields) => {
      setAuth({ ...user!, ...updatedFields });
      toast.success('저장되었습니다');
      refetch();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(profileData);
  };

  const handleImageChange = (file: File | string) => {
    setProfileData((prev) => ({ ...prev, image: file }));
  };

  return (
    <ModalContainer
      isOpen={type === 'USER_PROFILE'}
      onClose={onCloseModal}
      title="프로필 편집"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-2 text-left"
      >
        <div className="flex flex-col items-center gap-2">
          <UserImageUploader
            image={profileData.image}
            onImageChange={handleImageChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">사용자명</label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full rounded-md bg-dark-gray px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-purple"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">한줄소개</label>
          <textarea
            rows={3}
            value={profileData.description}
            onChange={(e) => setProfileData((prev) => ({ ...prev, description: e.target.value }))}
            className="w-full rounded-md bg-dark-gray px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-purple"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="hover:bg-blue-600 mb-4 rounded-md bg-blue-purple px-4 py-2 font-medium text-white disabled:opacity-50"
          >
            저장하기
          </button>
        </div>
      </form>
    </ModalContainer>
  );
};
