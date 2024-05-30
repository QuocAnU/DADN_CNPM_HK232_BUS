import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import ButtonSM from "../Components/ButtonSM";
import LogoT from "../Components/LogoT";
import "./TextField.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});
export default function ForgetPass2() {
  const location = useLocation();
  const { email } = location.state;
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const checkForgetPassword = async () => {
      const forgotPassword = localStorage.getItem("forgotPassword");
      if (!forgotPassword || forgotPassword !== "true") {
        navigate("/forgetpass");
      }
    };

    checkForgetPassword();
  }, [navigate]);
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await api.post("/auth/confirm/otp", { email, otp });
      console.log("success");
      localStorage.setItem("forgotPassword2", "true"); // Lưu trạng thái đã quên mật khẩu
      navigate("/forgetpass3", { state: { email: email } });
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("OTP is wrong! Please try again.");
    }
  };

  return (
    <div className="bg">
      <div className="loginBox">
        <LogoT name="Quên mật khẩu" />
        <div className="inputF">
          <div className="textField">
            <div className="titleS">OTP</div>
            <input
              type="text"
              className="input1"
              value={otp}
              onChange={handleOtpChange}
            />
          </div>
        </div>
        {error && <div className="error">{error}</div>}
        <ButtonSM text="Tiếp tục" onClick={handleSubmit} />
      </div>
    </div>
  );
}
