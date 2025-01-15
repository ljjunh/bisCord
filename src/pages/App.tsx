import '../app/App.css';
import { path } from '../shared/constants/path';
import ChannelPage from './channels';
import DirectMessagePage from './directMessage';
import MainPage from './main';
import SigninPage from './signin';
import SignupPage from './signup';
import Layout from '@/widgets/components/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  // TODO : 현재 백엔드 로그인쪽이 덜되서 임시값으로 테스트중입니다
  const token = false;

  return (
    <Routes>
      {/* 비인증 사용자용 라우트 */}
      <Route
        path={path.signin}
        element={
          !token ? (
            <SigninPage />
          ) : (
            <Navigate
              to={path.home}
              replace
            />
          )
        }
      />
      <Route
        path={path.signup}
        element={
          !token ? (
            <SignupPage />
          ) : (
            <Navigate
              to={path.home}
              replace
            />
          )
        }
      />

      {/* 인증된 사용자용 라우트 */}
      <Route
        element={
          token ? (
            <Layout />
          ) : (
            <Navigate
              to={path.signin}
              replace
            />
          )
        }
      >
        <Route
          path={path.home}
          element={<MainPage />}
        />
        <Route
          path={path.directmessage}
          element={<DirectMessagePage />}
        />
        <Route
          path={path.server}
          element={<ChannelPage />}
        />
      </Route>

      {/* 기본 리다이렉트 */}
      <Route
        path="*"
        element={
          <Navigate
            to={token ? path.home : path.signin}
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;
