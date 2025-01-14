import { Outlet } from "react-router-dom";
import ChannelList from "./channel/ChannelList";
import SideNav from "./SideNav";

/** Main UI layout */
const Layout = () => {
  return (
    <div className="w-full h-full flex flex-row relative bg-black">
      <SideNav />
      <ChannelList />
      <div className=" flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
