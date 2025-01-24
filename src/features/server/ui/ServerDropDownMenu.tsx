import { useModalStore } from '@/shared/model/modalStore';
import AddUserIcon from '@/shared/icons/AddUserIcon';
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/shared/ui/dropdown-menu';

const ServerDropDownMenu = () => {
  const { onOpenModal } = useModalStore((state) => state);

  const handleModal = (type: string) => {
    if (type === 'create') {
      onOpenModal('CREATE_CHANNEL');
    }
    if (type === 'delete') {
      onOpenModal('DELETE_SERVER');
    }
    if (type === 'invite') {
      onOpenModal('INVIDE_MEMBER');
    }
  };

  return (
    <>
      <DropdownMenuLabel>서버 관리</DropdownMenuLabel>
      <DropdownMenuSeparator className="bg-gray opacity-50" />
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={() => handleModal('invite')}>
          <span className="mr-auto">친구 초대하기</span>
          <AddUserIcon size={15} />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="mr-auto">서버 설정</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleModal('create')}>
          <span className="mr-auto">채널 만들기</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator className="bg-gray opacity-50" />
      <DropdownMenuItem
        className="text-red focus:bg-red"
        onClick={() => handleModal('delete')}
      >
        <span className="">서버 삭제하기</span>
      </DropdownMenuItem>
    </>
  );
};

export default ServerDropDownMenu;
