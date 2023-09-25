import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "~/redux/user";
import { StoreRootState } from "~/redux";

function Home() {
  const isLogin = useSelector<StoreRootState, boolean>(
    (state) => state.user.isLogin
  );
  const dispatch = useDispatch();
  const logout = () => {
    window.electron.authControl("logout");
    dispatch(login(false));
  };

  console.log(isLogin);
  return (
    <div>
      <Button onClick={logout} type="primary">
        退出1{isLogin}
      </Button>
    </div>
  );
}

export default Home;
