import { contextBridge, ipcRenderer } from "electron";
import type { ElectronRendererContext } from "@app/types";

// 定义上下文
const electronContext: ElectronRendererContext = {
  authControl: action => ipcRenderer.send("auth-control", action),
  dragAreaClick: () => ipcRenderer.send("drag-area-click"),
  appWindowMove: allowMove => ipcRenderer.send('app-win-move', allowMove),
  appWindowResize: allowResize => ipcRenderer.send('app-win-resize', allowResize),
  appWindowShow: () => ipcRenderer.send('win-show'),
  ipcRenderer
};

contextBridge.exposeInMainWorld("electron", electronContext);
