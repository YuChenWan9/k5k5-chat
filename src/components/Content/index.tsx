import TabBar from "../TabBar";
import './index.scss'
function Content({ children }: { children: React.ReactNode }) {
    return (
        <div className="app-content">
            <TabBar />
            <div>
                {children}
            </div>
        </div>
    )
}

export default Content;