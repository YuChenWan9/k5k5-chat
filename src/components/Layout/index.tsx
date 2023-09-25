import SideBar from '../SideBar';
import Content from '../Content';
// import Home from '~/pages/Home';
import SideMenu from '../SideMenu';

import './index.scss'

type LayoutPropsType = React.PropsWithChildren;

function Layout({ children }: LayoutPropsType) {
    return (
        <div className='layout'>
            <SideMenu />
            <SideBar />
            <Content>
                {children}
            </Content>
        </div>
    )
}

export default Layout;