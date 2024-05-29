import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import ButtonSM from "../Components/ButtonSM";
import LogoT from "../Components/LogoT";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default function ForgetPass() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    console.log(email);
    try {
      await api.post("/auth/otp", { email });
      localStorage.setItem("forgotPassword", "true"); // Lưu trạng thái đã quên mật khẩu
      navigate("/forgetpass2", { state: { email } });
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Email doesn't exist! Please try again.");
    }
  };

  return (
    <div className="bg">
      <div className="loginBox">
        <LogoT name="Quên mật khẩu" />
        <div className="inputF">
          <div className="textField">
            <div className="titleS">Email</div>
            <input
              type="email"
              className="input1"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
        </div>
        {error && <div className="error">{error}</div>}
        <ButtonSM text="Tiếp tục" onClick={handleSubmit} />
      </div>
    </div>
  );
}
