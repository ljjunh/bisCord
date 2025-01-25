import { useModalStore } from '@/shared/model/modalStore';
import ModalContainer from '@/shared/ui/layout/ModalContainer';

export const UserProfileModal = () => {
  const { type, onCloseModal } = useModalStore((state) => state);

  return (
    <ModalContainer
      isOpen={type === 'USER_PROFILE'}
      onClose={onCloseModal}
      title="프로필 수정"
      description="설명칸임"
    >
      <div className="space-y-6 p-4">
        {/* 프로필 이미지 */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="bg-blue-500 hover:bg-blue-600 absolute bottom-0 right-0 rounded-full p-2"></button>
          </div>
          <div className="text-gray-400 text-sm">이미지 조회해서 넣자</div>
        </div>

        {/* 이름 입력 */}
        <div className="space-y-2">
          <label className="text-gray-200 text-sm font-medium">이름</label>
          <input
            type="text"
            className="focus:ring-blue-500 w-full rounded-md bg-dark-gray px-3 py-2 text-white focus:outline-none focus:ring-2"
          />
        </div>

        {/* 한줄소개 입력 */}
        <div className="space-y-2">
          <label className="text-gray-200 text-sm font-medium">한줄소개</label>
          <textarea
            rows={3}
            className="focus:ring-blue-500 w-full rounded-md bg-dark-gray px-3 py-2 text-white focus:outline-none focus:ring-2"
            placeholder="자신을 소개해보세요"
          />
        </div>

        {/* 저장 버튼 */}
        <div className="flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2 font-medium text-white">
            저장하기
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};
