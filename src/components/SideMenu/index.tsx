import './index.scss';
import TabBar from "../TabBar";
function SideMenu() {
    return (
        <div className='side-menu'>
            <TabBar />
            <div className='re-size-div'></div>
        </div>
    )
}
export default SideMenu;