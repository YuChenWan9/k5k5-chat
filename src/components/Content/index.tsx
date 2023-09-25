import TabBar from "../TabBar";
import './index.scss'
function Content({ children }: { children: React.ReactNode }) {
    return (
        <div className="app-content k5k5-theme__bg">
            <TabBar />
            <div>
                {children}
            </div>
        </div>
    )
}

export default Content;