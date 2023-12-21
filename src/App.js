import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./apps/auth/components/Login";
import Signup from "./apps/auth/components/Signup";
import Home from "./apps/home/components/Home";
import ForgotPassword from "./apps/auth/components/ForgotPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
