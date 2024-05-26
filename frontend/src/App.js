import QuanLyTT from "./Pages/QuanLyTT";
import ForgetPass from "./Pages/ForgetPass";
import Login from "./Pages/Login";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quanlytt" element={<QuanLyTT />} />
        <Route path="/forgetpass" element={<ForgetPass />} />
      </Routes>
    </Router>
  );
}
