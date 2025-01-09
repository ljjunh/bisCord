import ChannelList from "./ChannelList";
import SideNav from "./SideNav";

interface ILayoutProps {
  children: React.ReactNode;
}

/** Main UI layout */
const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="w-full h-full flex flex-row relative bg-black">
      <SideNav />
      <ChannelList />
      <div className=" flex-grow">{children}</div>
    </div>
  );
};

export default Layout;
