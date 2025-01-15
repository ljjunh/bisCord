// import useGetParams from '@/entities/hooks/getParams';
import Contents from '@/widgets/components/Contents';
import DmProfile from '@/widgets/directMessage/DmProfile';
import DmList from '@/widgets/directMessage/ui/DmList';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const DirectMessagePage = () => {
  const userId = useParams();

  useEffect(() => {
    console.log(userId);
  });

  return (
    <div className="flex h-full">
      <DmList />
      <div className="flex-grow">
        <Contents></Contents>
      </div>
      <div className="hidden lg:block">
        <DmProfile />
      </div>
    </div>
  );
};

export default DirectMessagePage;
