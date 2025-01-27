import React from 'react';

// import EmptyBgIcon from '@/shared/icons/EmptyBgIcon';

interface ContentsContainerProps {
  children?: React.ReactNode;
}

const ContentsContainer = ({ children }: ContentsContainerProps) => {
  return (
    <div className="relative flex h-[100vh] w-full flex-grow flex-col bg-mid-gray">
      <>{children}</>
    </div>
  );
};

export default ContentsContainer;
