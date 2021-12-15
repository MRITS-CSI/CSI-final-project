import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Success from "./Components/Success";
import { checkToken } from "./Utils/LoginHandler";
const App = () => {
  let [loginStat, setLoginStat] = useState(false);
  let token = window.sessionStorage.getItem("jwt");
  useEffect(() => {
    let init = async () => {
      let val = await checkToken(token);
      setLoginStat(val);
    };
    init();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        {loginStat ? <Route path="/AI" element={<Success />}></Route> : null}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
