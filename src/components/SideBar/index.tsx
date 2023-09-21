import './index.scss';
import TabBar from "../TabBar";
function SideBar() {
    return (
        <div className='side-menu'>
            <TabBar allowResize={false} />
            <div className='re-size-div'></div>
        </div>
    )
}
export default SideBar;