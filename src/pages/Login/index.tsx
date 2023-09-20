import './login.scss';
// import MyButton from '~/components/MyButton';
import { Button } from 'antd';
import AccountSecretLogin from './components/AccountSecretLogin';
import ScanCodeLogin from './components/ScanCodeLogin';
import { useNavigate } from 'react-router-dom';
import TabBar from '~/components/TabBar';
import { useDispatch } from 'react-redux';
import { login } from '~/redux/user';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cc = () => {
        window.electron.authControl('login');
        navigate('/home')
        dispatch(login(true));
    }

    return (
        <div className="login">
            <TabBar allowResize={false} />
            <AccountSecretLogin />
            {/* <ScanCodeLogin /> */}
            <Button onClick={cc} type="primary">登录</Button>
            <div>
                
            </div>
        </div>
    )
}

export default Login;