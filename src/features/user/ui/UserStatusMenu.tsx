import { useMutation } from '@tanstack/react-query';
import type { LoginStatus } from '@/entities/user/model/types';
import { useAuthStore } from '@/shared/model/store/authStore';
import { LOGIN_STATUS, LOGIN_STATUS_LABEL } from '@/entities/user/model/constants';
import { SwitchCase } from '@/shared/ui/SwitchCase';
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/shared/ui/dropdown-menu';
import { userQueries } from '../api/queries';

export const UserStatusMenu = () => {
  const setLoginStatus = useAuthStore((state) => state.setLoginStatus);
  const user = useAuthStore((state) => state.user);
  const currentStatus = user?.loginStatus ?? 'OFFLINE';

  const { mutate } = useMutation({
    ...userQueries.postUserStatus,
    onSuccess: (_, variables) => {
      setLoginStatus(variables.status);
    },
  });

  const handleStatusChange = (status: LoginStatus) => () => {
    mutate({ status });
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="flex w-full items-center gap-2.5 px-2 py-1 text-left hover:rounded hover:bg-mid-gray hover:text-white">
        <SwitchCase
          value={currentStatus}
          caseBy={{
            ONLINE: (
              <>
                <div className="h-3 w-3 rounded-full bg-green" />
                {LOGIN_STATUS_LABEL.ONLINE}
              </>
            ),
            AWAY: (
              <>
                <div className="h-3 w-3 rounded-full bg-yellow" />
                {LOGIN_STATUS_LABEL.AWAY}
              </>
            ),
            BUSY: (
              <>
                <div className="h-3 w-3 rounded-full bg-red" />
                {LOGIN_STATUS.BUSY}
              </>
            ),
            OFFLINE: (
              <>
                <div className="h-3 w-3 rounded-full bg-gray" />
                {LOGIN_STATUS.OFFLINE}
              </>
            ),
          }}
          defaultComponent={
            <>
              <div className="h-3 w-3 rounded-full bg-green" />
              {LOGIN_STATUS_LABEL.ONLINE}
            </>
          }
        />
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="min-w-[250px] space-y-2 border-0 bg-[#000000]">
        <DropdownMenuItem onClick={handleStatusChange(LOGIN_STATUS.ONLINE)}>
          <div className="h-2.5 w-2.5 rounded-full bg-green" />
          {LOGIN_STATUS_LABEL.ONLINE}
        </DropdownMenuItem>

        <div className="h-px bg-gray-600" />
        <DropdownMenuItem onClick={handleStatusChange(LOGIN_STATUS.AWAY)}>
          <div className="h-2.5 w-2.5 rounded-full bg-yellow" />
          {LOGIN_STATUS_LABEL.AWAY}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleStatusChange(LOGIN_STATUS.BUSY)}>
          <div className="h-2.5 w-2.5 rounded-full bg-red" />
          {LOGIN_STATUS_LABEL.BUSY}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleStatusChange(LOGIN_STATUS.OFFLINE)}>
          <div className="h-2.5 w-2.5 rounded-full bg-gray" />
          {LOGIN_STATUS_LABEL.OFFLINE}
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};
