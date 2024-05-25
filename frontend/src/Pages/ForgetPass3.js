import "./Login.css";
import TextField from "../Components/TextField";
import ButtonSM from "../Components/ButtonSM";
import LogoT from "../Components/LogoT";

export default function ForgetPass() {
  return (
    <div className="bg">
      <div className="loginBox">
        <LogoT name="Đặt mật khẩu mới"></LogoT>
        <div className="inputF">
          <TextField title="Nhập mật khẩu" type="password"></TextField>
          <TextField title="Nhập lại mật khẩu" type="password"></TextField>
        </div>
        <ButtonSM text="Xác nhận" className="bt3"></ButtonSM>
      </div>
    </div>
  );
}
