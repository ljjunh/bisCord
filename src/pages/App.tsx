import '../app/App.css';
import { path } from '../shared/path';
import ChannelPage from './channels';
import DirectMessagePage from './directMessage';
import MainPage from './main';
import NotFound from './notFound';
import SigninPage from './signin';
import SignupPage from './signup';
import Layout from '@/widgets/components/Layout';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          {/* 페이지는 여기에 추가하시면 됩니다 (path는 shared디렉토리에 추가해서 사용) */}
          <Route
            path={path.home}
            element={<MainPage />}
          />
          {/* direct messsage */}
          <Route
            path={path.directmessage}
            element={<DirectMessagePage />}
          />

          {/* server 및 하위 채널 */}
          <Route
            path={path.server}
            element={<ChannelPage />}
          />
          {/* <Route
            path={path.server_id()}
            element={<ChannelPage />}
          /> */}

          {/* user관련 */}
          <Route
            path={path.signin}
            element={<SigninPage />}
          />
          <Route
            path={path.signup}
            element={<SignupPage />}
          />

          {/* page not found */}
          <Route
            path={path.notFound}
            element={<NotFound />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
