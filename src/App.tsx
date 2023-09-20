import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
// import Home from './pages/Home';
import Layout from './components/Layout';
import { Navigate } from 'react-router-dom';
import type { StoreRootState } from '~/redux';
import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { login } from '~/redux/user';

function App() {
  // const dispatch = useDispatch();

  const isLogin = useSelector<StoreRootState, boolean>(state => state.user.isLogin);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        {
          isLogin ?
            <Route path='/home' element={<Layout />} ></Route> :
            <Route path='/' element={<Navigate to="/login" />} ></Route>
        }
      </Routes>
    </BrowserRouter>


  );
}

export default App;
