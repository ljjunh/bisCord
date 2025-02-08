import { MODAL, useModalStore } from '@/shared/model/modalStore';
import { ModalType } from '@/shared/constants/modalType';
import { AddUserIcon } from '@/shared/icons/AddUserIcon';
import { ChannelUnlockedIcon } from '@/shared/icons/ChannelUnlockedIcon';
import { SettingIcon } from '@/shared/icons/SettingIcon';
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/shared/ui/dropdown-menu';

const ServerDropDownMenu = () => {
  const { onOpenModal } = useModalStore((state) => state);

  const handleModal = (type: keyof typeof MODAL) => {
    onOpenModal(type);
  };

  return (
    <>
      <DropdownMenuLabel>서버 관리</DropdownMenuLabel>
      <DropdownMenuSeparator className="bg-gray opacity-50" />
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={() => handleModal(ModalType.INVIDE_MEMBER)}>
          <span className="mr-auto">친구 초대하기</span>
          <AddUserIcon size={15} />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleModal(ModalType.EDIT_SERVER)}>
          <span className="mr-auto">서버 설정</span>
          <SettingIcon size={15} />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleModal(ModalType.CREATE_CHANNEL)}>
          <span className="mr-auto">채널 만들기</span>
          <ChannelUnlockedIcon size={15} />
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator className="bg-gray opacity-50" />
      <DropdownMenuItem
        className="text-red focus:bg-red"
        onClick={() => handleModal(ModalType.DELETE_SERVER)}
      >
        <span className="">서버 삭제하기</span>
      </DropdownMenuItem>
    </>
  );
};

export default ServerDropDownMenu;
