import ChannelUnlockedIcon from '../../../shared/icons/ChannelUnlockedIcon';

interface IChannelItemProps {
  name: string; // 'name'은 문자열 타입
}

const ChannelItem = ({ name }: IChannelItemProps) => {
  return (
    <>
      <div></div>
      <div className="flex flex-row items-center gap-2 rounded-md p-2 text-light-gray hover:bg-gray">
        <ChannelUnlockedIcon size={15} />
        <div className="text-md font-normal">{name}</div>
      </div>
    </>
  );
};

export default ChannelItem;
