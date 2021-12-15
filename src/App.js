import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import Login from './Components/Login';
import Success from './Components/Success';
const App = () => {
return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}>
      
      </Route>

      <Route path="/success" element={<Success />}></Route>
    </Routes>
  </BrowserRouter>
)
   }



export default App;
