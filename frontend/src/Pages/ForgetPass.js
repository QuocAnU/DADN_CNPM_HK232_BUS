import "./Login.css";
import TextField from "../Components/TextField";
import ButtonSM from "../Components/ButtonSM";
import LogoT from "../Components/LogoT";

export default function ForgetPass() {
  return (
    <div className="bg">
      <div className="loginBox">
        <LogoT name="Quên mật khẩu"></LogoT>
        <div className="inputF">
          <TextField title="Email" type="email"></TextField>
        </div>
        <ButtonSM text="Tiếp tục"></ButtonSM>
      </div>
    </div>
  );
}
