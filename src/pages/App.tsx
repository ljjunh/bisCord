import { Route, Routes } from "react-router-dom";
import "../app/App.css";
import MainPage from "./main";
import ChannelPage from "./channels";
import SigninPage from "./signin";
import SignupPage from "./signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/channels" element={<ChannelPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
