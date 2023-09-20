import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '~/redux/user';
import { useEffect } from 'react';

function Home() {
    
    const dispatch = useDispatch();
    const navigator = useNavigate();
    useEffect(() => {
        window.electron.getLoginInfo(isLogin => {
            dispatch(login(isLogin));
            if(!isLogin) navigator('/login')
        })
    })
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