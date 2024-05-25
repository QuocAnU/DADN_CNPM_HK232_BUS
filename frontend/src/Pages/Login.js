import React, { useState } from "react";
import "./Login.css";
import TextField from "../Components/TextField";
import ButtonSM from "../Components/ButtonSM";
import LogoT from "../Components/LogoT";
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

const login = async (email, password) => {
  try {
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

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      console.log("Login successful:", response);
    } catch (error) {
      setError("Đăng nhập không thành công!");
    }
  };

  return (
    <div className="bg">
      <div className="loginBox">
        <LogoT name="Đăng nhập" />
        <div className="inputF">
          <TextField
            title="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            title="Mật khẩu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
