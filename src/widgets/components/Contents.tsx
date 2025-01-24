/** 채팅 및 메인 화면UI */
import UserAvatar from '@/shared/ui/UserAvatar';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const Contents = () => {
  const userId = useParams();
  useEffect(() => {
    console.log(userId.id);
  });
  return (
    <div>
      {userId.id} 페이지
      {/* 메세지 채팅 영역 */}
      <div className="text-md flex flex-col text-white">
        <div className="flex w-full items-center gap-2 px-2 py-1 hover:bg-dark-gray hover:bg-opacity-50">
          <UserAvatar size={20} />
          <div className="flex flex-col">
            <div className="flex items-end gap-2 font-semibold">
              <div className="">정경준</div>
              <div className="text-xs text-light-gray">2025-01-15</div>
            </div>
            <div>이건 메세지 이빈다.</div>
          </div>
        </div>

        <div className="flex w-full items-center gap-2 px-2 py-1 hover:bg-dark-gray hover:bg-opacity-50">
          <UserAvatar
            bg="red"
            size={20}
          />
          <div className="flex flex-col">
            <div className="flex items-end gap-2 font-semibold">
              <div className="">정경준</div>
              <div className="text-xs text-light-gray">2025-01-15</div>
            </div>
            <div>이건 메세지 이빈다.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contents;
