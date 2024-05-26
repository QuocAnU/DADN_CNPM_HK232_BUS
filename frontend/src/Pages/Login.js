import React, { useState } from "react";
import "./Login.css";
import ButtonSM from "../Components/ButtonSM";
import LogoT from "../Components/LogoT";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

const login = async (email, password) => {
  try {
    console.log("Login", email, password);
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      console.log("Login successful:", response);
      navigate("/quanlytt");
    } catch (error) {
      setError("Đăng nhập không thành công!");
    }
  };

  return (
    <div className="bg">
      <div className="loginBox">
        <LogoT name="Đăng nhập" />
        <div className="inputF">
          <div className="textField">
            <div className="titleS">Email</div>
            <input
              type="email"
              className="input1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="textField">
            <div className="titleS">Mật khẩu</div>
            <input
              type="password"
              className="input1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {error && <div className="error">{error}</div>}
        <ButtonSM text="Đăng nhập" onClick={handleLogin} />
        <a href="/" className="text2">
          Quên mật khẩu
        </a>
      </div>
    </div>
  );
}
