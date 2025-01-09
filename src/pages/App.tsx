import { Route, Routes } from "react-router-dom";
import "../app/App.css";
import MainPage from "./main";
import ChannelPage from "./channels";
import SigninPage from "./signin";
import SignupPage from "./signup";
import Layout from "../widgets/components/Layout";
import DirectMessagePage from "./directMessage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/directmessage" element={<DirectMessagePage />} />
          <Route path="/channels" element={<ChannelPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
