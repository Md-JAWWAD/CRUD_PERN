import { useState } from "react";
import { Router, Route, Routes } from "react-router-dom";
import Signup from "./SignUp_Login/Signup";
import Login from "./SignUp_Login/Login";
import Base from './Dashboard/Base'


function App() {
  return (
    <Routes>
      <Route index element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/dashboard" element={<Base/>} />
    </Routes>
  );
}

export default App;
