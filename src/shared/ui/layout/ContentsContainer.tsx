import React from 'react';

interface ContentsContainerProps {
  children?: React.ReactNode;
}

export const ContentsContainer = ({ children }: ContentsContainerProps) => {
  return (
    <div className="relative flex h-[100vh] w-full flex-grow flex-col bg-mid-gray">
      <>{children}</>
    </div>
  );
};
