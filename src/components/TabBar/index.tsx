import './index.scss'
function TabBar({ allowResize = true, children }: { allowResize?: boolean, children?: React.ReactNode }) {
    const sizeBtn = () => {
        if(!allowResize) return;
        window.electron.appWindowResize(true);
    }

    const winDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLButtonElement || e.target instanceof HTMLTextAreaElement) {
            window.electron.appWindowMove(false);
            return
        }

        window.electron.appWindowMove(true);

        window.onmouseup = () => {
            window.electron.appWindowMove(false);
            window.onmouseup = null;
        }
    }

    return (
        <div onDoubleClick={sizeBtn} onMouseDown={winDown} id="drag-area">
            {children}
        </div>
    )
}

export default TabBar;