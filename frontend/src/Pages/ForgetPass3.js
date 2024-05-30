import React, { useState } from "react";
import "./Login.css";
import ButtonSM from "../Components/ButtonSM";
import LogoT from "../Components/LogoT";
import "./TextField.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});
export default function ForgetPass3() {
  const location = useLocation();
  const { email } = location.state;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = async () => {
    console.log(email, password, confirmPassword);
    if (password !== confirmPassword) {
      console.error("Error sending OTP:", error);
      setError("Password is differ with confirmpassword!");
    } else {
      try {
        await api.patch("/auth/update/password", { email, password });
        console.log("success");
        localStorage.setItem("forgotPassword2", "true"); // Lưu trạng thái đã quên mật khẩu
        navigate("/login");
      } catch (error) {
        console.error("Error reset password:", error);
        setError("Password is differ with confirmpassword!");
      }
    }
  };

  return (
    <div className="bg">
      <div className="loginBox">
        <LogoT name="Đặt mật khẩu mới"></LogoT>
        <div className="inputF">
          <div className="titleS">Mật khẩu</div>
          <input
            type="password"
            className="input1"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="titleS">Xác nhận mật khẩu</div>
          <input
            type="password"
            className="input1"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <ButtonSM text="Xác nhận" onClick={handleSubmit} />
      </div>
    </div>
  );
}
