import { ReactNode } from 'react';

interface CHMessageProps {
  children: ReactNode;
}

const ChMessage = ({ children }: CHMessageProps) => {
  return <div className="flex w-full flex-col-reverse">{children}</div>;
};

export default ChMessage;
