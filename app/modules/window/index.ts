import { ipcMain, screen } from "electron";
import type { ModuleFunction, AppContextType } from "@app/app";

/**
 * 操作窗口相关方法
 */
const WindowModule: ModuleFunction = (context) => {
  ipcMain.on("open-new-window", (config) => {
    // if(config) context.createWindow(config);
    console.log(123);
  });

};

export default WindowModule;
