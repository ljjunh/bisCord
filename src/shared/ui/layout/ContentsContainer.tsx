import React from 'react';
import EmptyBgIcon from '@/shared/icons/EmptyBgIcon';

interface IContentsContainerProps {
  children?: React.ReactNode;
}

const ContentsContainer = ({ children }: IContentsContainerProps) => {
  return (
    <div className="relative flex h-full w-full flex-grow flex-col bg-mid-gray">
      {children ? (
        <>{children}</>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <EmptyBgIcon />
          <div className="text-md font-semibold text-light-gray">
            아무도 비슷코드와 놀고싶지 않나봐요
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentsContainer;
