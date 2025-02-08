import { ReactNode } from 'react';

interface CHMessageProps {
  children: ReactNode;
  channelId: number;
}

export const ChMessage = ({ children }: CHMessageProps) => {
  return (
    <div className="flex w-full flex-col-reverse overflow-y-scroll scrollbar-hide">{children}</div>
  );
};
