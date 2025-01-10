import { Route, Routes } from "react-router-dom";
import "../app/App.css";
import MainPage from "./main";
import ChannelPage from "./channels";
import SigninPage from "./signin";
import SignupPage from "./signup";
import Layout from "../widgets/components/Layout";
import DirectMessagePage from "./directMessage";
import { path } from "../shared/path";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          {/* 페이지는 여기에 추가하시면 됩니다 (path는 shared디렉토리에 추가해서 사용) */}
          <Route path={"/"} element={<MainPage />} />
          <Route path={path.directmessage} element={<DirectMessagePage />} />
          <Route path={path.channels} element={<ChannelPage />} />
          <Route path={path.signin} element={<SigninPage />} />
          <Route path={path.signup} element={<SignupPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
