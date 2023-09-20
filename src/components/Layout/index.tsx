import SideBar from '../SideBar';
import Content from '../Content';
import Home from '~/pages/Home';
import SideMenu from '../SideMenu';

import './index.scss'

function Layout() {
    return (
        <div className='layout'>
            <SideBar />
            <SideMenu />
            <Content>
                <Home />
            </Content>
        </div>
    )
}

export default Layout;