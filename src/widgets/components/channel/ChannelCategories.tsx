import { useState } from "react";
import ChannelItem from "./ChannelItem";
import ArrowDown from "../../../shared/icons/ArrowDown";
import ArrowRight from "../../../shared/icons/ArrowRight";

const ChannelCategories = () => {
  const [open, isOpen] = useState<boolean>(true);

  /** 채널 목록 토글 핸들러 */
  const handleToggle = () => {
    isOpen(!open);
  };

  return (
    <div className=" flex flex-col">
      <div
        onClick={handleToggle}
        className=" flex gap-2 py-1 items-center text-light-gray hover:text-white"
      >
        <div className=" w-[15px] flex justify-center items-center">
          {open ? <ArrowDown size={12} /> : <ArrowRight size={12} />}
        </div>
        {/* channel 카테고리 */}
        <div className=" text-xs">{"공지사항"}</div>
      </div>
      {/* map으로 채널 리스트 작성 */}
      {open && (
        <>
          <ChannelItem />
          <ChannelItem />
          <ChannelItem />
        </>
      )}
    </div>
  );
};

export default ChannelCategories;
