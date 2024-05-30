import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import QuanLyTT from "./Pages/QuanLyTT";
import ForgetPass from "./Pages/ForgetPass";
import ForgetPass2 from "./Pages/ForgetPass2"; // Assuming you have ForgetPass2 page
import ForgetPass3 from "./Pages/ForgetPass3";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quanlytt" element={<QuanLyTT />} />
        <Route path="/forgetpass" element={<ForgetPass />} />
        <Route path="/forgetpass2" element={<ForgetPass2 />} />
        <Route path="/forgetpass3" element={<ForgetPass3 />} />
      </Routes>
    </Router>
  );
}

export default App;