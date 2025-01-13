import ChannelList from '../channel/ChannelList';
import SideNav from './SideNav';
import { Outlet } from 'react-router-dom';

/** Main UI layout */
const Layout = () => {
  return (
    <div className="relative flex h-full w-full flex-row bg-black">
      <SideNav />
      <ChannelList />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
