import React from 'react';

interface IContentsContainerProps {
  children: React.ReactNode;
}

const ContentsContainer = ({ children }: IContentsContainerProps) => {
  return <div className="relative flex flex-grow flex-col bg-mid-gray">{children}</div>;
};

export default ContentsContainer;
