import './login.scss';
// import MyButton from '~/components/MyButton';
import { Button } from 'antd';
import AccountSecretLogin from './components/AccountSecretLogin';
import ScanCodeLogin from './components/ScanCodeLogin';
import { useNavigate } from 'react-router-dom';
import TabBar from '~/components/TabBar';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '~/redux/user';
import { useEffect } from 'react';
import type { StoreRootState } from '~/redux';

function Login() {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.electron.getLoginInfo(isLogin => {
            dispatch(login(isLogin));
        })
    })
    const isLogin = useSelector<StoreRootState, boolean>(state => state.user.isLogin);
    if (isLogin) navigate('/home')

    const cc = () => {
        window.electron.authControl('login');
        navigate('/home')
        dispatch(login(true));
    }

    return (
        <div className="login">
            <TabBar allowResize={false} />
            <div className='login-main'>
                <AccountSecretLogin />
                {/* <ScanCodeLogin /> */}
                <Button style={{ width: '100%', height: '40px' }} onClick={cc} type="primary">登录</Button>
            </div>
        </div>
    )
}

export default Login;