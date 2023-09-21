import SideBar from '../SideBar';
import Content from '../Content';
import Home from '~/pages/Home';
import SideMenu from '../SideMenu';

import './index.scss'

function Layout() {
    return (
        <div className='layout'>
            <SideMenu />
            <SideBar />
            <Content>
                <Home />
            </Content>
        </div>
    )
}

export default Layout;