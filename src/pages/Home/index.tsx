import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '~/redux/user';

function Home() {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const logout = () => {
        window.electron.authControl('logout');
        navigator('/login')
        dispatch(login(false));
    }
    return (
        <div><Button onClick={logout} type="primary">退出</Button></div>
    )
}

export default Home;