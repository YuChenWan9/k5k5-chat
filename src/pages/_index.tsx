import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "~/redux/user";
import { useEffect } from "react";
import Layout from "~/components/Layout";
import { StoreRootState } from "~/redux";

function Index() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const location = useLocation();
  const isLogin = useSelector<StoreRootState, boolean>(
    (state) => state.user.isLogin
  );
  useEffect(() => {
    window.electron.getLoginInfo((isLoginStatus) => {
      dispatch(login(isLoginStatus));
      if (location.pathname === "/login" && isLoginStatus) {
        navigator("/");
      }

      if (location.pathname !== "/login" && !isLoginStatus) {
        navigator("/login");
      }
    });
  });

  if (isLogin) {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  }

  return <Outlet />;
}

export default Index;
