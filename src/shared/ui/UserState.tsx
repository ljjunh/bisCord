import { LoginStatus } from '../model/types';
import { SwitchCase } from './SwitchCase';

interface UserStateProps {
  state?: LoginStatus;
}

export const UserState = ({ state = 'OFFLINE' }: UserStateProps) => {
  return (
    <div className="absolute bottom-0 right-0 flex aspect-[1/1] w-[35%] items-center justify-center overflow-hidden rounded-[50%] bg-black">
      <SwitchCase
        value={state}
        caseBy={{
          ONLINE: <div className="aspect-[1/1] w-[60%] rounded-[50%] bg-green" />,
          AWAY: <div className="aspect-[1/1] w-[60%] rounded-[50%] bg-yellow" />,
          BUSY: <div className="aspect-[1/1] w-[60%] rounded-[50%] bg-red" />,
          OFFLINE: <div className="aspect-[1/1] w-[60%] rounded-[50%] bg-gray" />,
        }}
      />
    </div>
  );
};
