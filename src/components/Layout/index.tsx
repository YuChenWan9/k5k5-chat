import SideBar from '../SideBar';
import Content from '../Content';
import Home from '~/pages/Home';

import './index.scss'

function Layout() {
    return (
        <div className='layout'>
            <SideBar />
            <Content>
                <Home />
            </Content>
        </div>
    )
}

export default Layout;