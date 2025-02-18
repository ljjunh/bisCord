import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/model/constants/routes';
import { EmptyBgIcon } from '@/shared/ui/icons/EmptyBgIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(ROUTES.ROOT);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-6 bg-mid-gray text-white">
      <EmptyBgIcon />
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없어요!</h1>
      <button
        onClick={handleButtonClick}
        className="rounded-md bg-blue-purple px-6 py-2 text-white duration-200 hover:bg-blue"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default NotFound;
