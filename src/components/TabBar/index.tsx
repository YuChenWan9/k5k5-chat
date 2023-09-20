import './index.scss'
function TabBar({ allowResize = true }: { allowResize?: boolean }) {
    const sizeBtn = () => {
        if(!allowResize) return;
        window.electron.appWindowResize(true);
    }

    const winDown = (e: React.SyntheticEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLButtonElement || e.target instanceof HTMLTextAreaElement) {
            window.electron.appWindowMove(false);
            return
        }

        window.electron.appWindowMove(true);
    }

    return (
        <div onDoubleClick={sizeBtn} onMouseDown={winDown} onMouseUp={() => window.electron.appWindowMove(false)} id="drag-area" />
    )
}

export default TabBar;