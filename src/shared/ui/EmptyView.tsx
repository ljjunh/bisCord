import EmptyBgIcon from '../icons/EmptyBgIcon';
import { ReactNode } from 'react';

interface EmptyViewProps {
  icon?: ReactNode;
  message: string;
}

export const EmptyView = ({ icon = <EmptyBgIcon />, message }: EmptyViewProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center text-super-light-gray">
      <div className="space-y-12 text-center">
        {icon}
        <p>{message}</p>
      </div>
    </div>
  );
};
