import "./styles/login.scss";
// import MyButton from '~/components/MyButton';
import { Button } from "antd";
import { AccountSecretLogin, ScanCodeLogin } from "~/components/LoginType";
import { useNavigate } from "react-router-dom";
import TabBar from "~/components/TabBar";
import { useDispatch } from "react-redux";
import { login } from "~/redux/user";

function Login() {
  const dispatch = useDispatch();

  const cc = () => {
    window.electron.authControl("login");
    dispatch(login(true));
  };

  return (
    <div className="login k5k5-login-img__bg">
      <TabBar allowResize={false} />
      <div className="login-main">
        <AccountSecretLogin />
        {/* <ScanCodeLogin /> */}
        <Button
          style={{ width: "100%", height: "40px" }}
          onClick={cc}
          type="primary"
        >
          登录
        </Button>
      </div>
    </div>
  );
}

export default Login;
