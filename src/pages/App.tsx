import '../app/App.css';
import { ROUTES } from '../shared/constants/routes';
import ChannelPage from './channels';
import DirectMessagePage from './directMessage';
import MainPage from './main';
import NotFound from './notFound';
import SigninPage from './signin';
import SignupPage from './signup';
import Layout from '@/widgets/components/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  // TODO : 현재 백엔드 로그인쪽이 덜되서 임시값으로 테스트중입니다
  const token = true;

  return (
    <Routes>
      {/* 비인증 사용자용 라우트 */}
      <Route
        path={ROUTES.AUTH.SIGN_IN}
        element={
          !token ? (
            <SigninPage />
          ) : (
            <Navigate
              to={ROUTES.ROOT}
              replace
            />
          )
        }
      />
      <Route
        path={ROUTES.AUTH.SIGN_UP}
        element={
          !token ? (
            <SignupPage />
          ) : (
            <Navigate
              to={ROUTES.ROOT}
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
              to={ROUTES.AUTH.SIGN_IN}
              replace
            />
          )
        }
      >
        <Route
          path={ROUTES.ROOT}
          element={<MainPage />}
        />
        <Route
          path={ROUTES.CHAT.DIRECT_MESSAGE}
          element={<DirectMessagePage />}
        />
        <Route
          path={ROUTES.CHAT.SERVER.ROOT}
          element={<ChannelPage />}
        />
      </Route>

      {/* 기본 리다이렉트 */}
      <Route
        path={ROUTES.NOT_FOUND}
        element={<NotFound />}
      />
    </Routes>
  );
}

export default App;
