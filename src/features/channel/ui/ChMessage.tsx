import { ReactNode } from 'react';

interface CHMessageProps {
  children: ReactNode;
  channelId: number;
}

const ChMessage = ({ children }: CHMessageProps) => {
  return (
    <div className="flex w-full flex-col-reverse overflow-y-scroll scrollbar-hide">{children}</div>
  );
};

export default ChMessage;
