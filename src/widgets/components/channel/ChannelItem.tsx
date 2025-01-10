import ChannelUnlockedIcon from "../../../shared/icons/ChannelUnlockedIcon";

const ChannelItem = () => {
  return (
    <>
      <div></div>
      <div className=" flex flex-row p-2 items-center gap-2 text-light-gray rounded-md hover:bg-gray">
        <ChannelUnlockedIcon size={15} />
        <div className="text-md font-normal">공지사항</div>
      </div>
    </>
  );
};

export default ChannelItem;
