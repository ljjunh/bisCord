import React from 'react';

interface IContentsContainerProps {
  children: React.ReactNode;
}

const ContentsContainer = ({ children }: IContentsContainerProps) => {
  return <div className="relative flex flex-grow flex-col bg-black">{children}</div>;
};

export default ContentsContainer;
