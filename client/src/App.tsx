import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Protected, IsUserLoggedIn } from "./assets/utilities";
import React from "react";
import DashBoard from "./components/DashBoard";
// import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IsUserLoggedIn><SignIn /></IsUserLoggedIn>}></Route>
        <Route path="/register" element={<IsUserLoggedIn><SignUp/></IsUserLoggedIn>}></Route>
        <Route path="/chat" element={<DashBoard/>} ></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;