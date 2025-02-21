import { EmptyBgIcon } from '../ui/icons/EmptyBgIcon';

interface EmptyViewProps {
  icon?: React.ReactElement;
  message: string;
}

const EmptyView = ({ icon = <EmptyBgIcon />, message }: EmptyViewProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center text-super-light-gray">
      <div className="space-y-12 text-center">
        {icon}
        <p>{message}</p>
      </div>
    </div>
  );
};

export default EmptyView;
