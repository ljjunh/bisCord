import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { UserProfile } from '@/entities/user/model/types';
import { useAuthStore } from '@/shared/model/authStore';
import { useModalStore } from '@/shared/model/modalStore';
import { userQueries } from '@/entities/user/api/queries';
import ModalContainer from '@/shared/ui/layout/ModalContainer';
import { userQueries as userMutations } from '../api/queries';

export const UserProfileModal = () => {
  // TODO : 분리하자 (이미지, 폼 제출)
  const { type, onCloseModal } = useModalStore((state) => state);
  const { user, setAuth } = useAuthStore((state) => state);
  const { data: userData, refetch } = useQuery({
    ...userQueries.getUser(),
  });

  const { mutate } = useMutation({
    ...userMutations.putUserProfile,
    onSuccess: (updatedFields) => {
      setAuth({ ...user!, ...updatedFields });
      toast.success('저장되었습니다');
      refetch();
    },
  });

  const [profileData, setProfileData] = useState<UserProfile>({
    name: '',
    description: '',
    image: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(profileData);
  };

  useEffect(() => {
    if (userData) {
      setProfileData({
        name: userData.name ?? '',
        description: userData.description ?? '',
        image: userData.profileImageURL ?? '',
      });
    }
  }, [userData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  return (
    <ModalContainer
      isOpen={type === 'USER_PROFILE'}
      onClose={onCloseModal}
      title="프로필 편집"
      description=""
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-2 text-left"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="relative h-24 w-24">
            <label className="flex h-full w-full cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-dark-gray hover:border-mid-gray">
              {profileData.image && (
                <img
                  src={
                    typeof profileData.image === 'object'
                      ? URL.createObjectURL(profileData.image)
                      : profileData.image
                  }
                  alt="프로필 이미지"
                  className="absolute h-full w-full rounded-full object-cover"
                />
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              {!profileData.image && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              )}
            </label>
          </div>
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
