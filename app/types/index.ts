import type { BrowserWindow, IpcRenderer } from 'electron';

export type AuthControlAction = 'login' | 'logout';

export interface ElectronRendererContext {
    authControl: (action: AuthControlAction) => void,
    dragAreaClick: () => void,
    appWindowMove: (allowMove: boolean) => void,
    appWindowResize: (allowResize: boolean) => void,
    appWindowShow: () => void,
    getLoginInfo: (callback: (isLogin: boolean) => void) => void
}


// 线程池
export interface WindowDict {
    [id: string]: BrowserWindow
}