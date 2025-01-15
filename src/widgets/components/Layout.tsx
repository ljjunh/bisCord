// import ChannelList from '../channel/ui/ChannelList';
import SideNav from './SideNav';
import ContentsContainer from '@/shared/ui/layout/ContentsContainer';
import { Outlet } from 'react-router-dom';

/** Main UI layout */
const Layout = () => {
  return (
    <div className="relative flex h-full w-full flex-row bg-mid-gray">
      <SideNav />
      <ContentsContainer>
        <Outlet />
      </ContentsContainer>
    </div>
  );
};

export default Layout;
