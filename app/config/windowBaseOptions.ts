import { join } from "path";
import { BrowserWindowConstructorOptions } from "electron";


const WindowBaseOptions: BrowserWindowConstructorOptions = {
  width: 320,
  height: 448,
  titleBarStyle: "hidden",
  frame: false,
  show: false,
  resizable: false, // 禁止缩放
  maximizable: false, // 禁止放大按钮
  webPreferences: {
    preload: join(__dirname, "../preload/index.js"),
    nodeIntegration: true,
  },
};

export default WindowBaseOptions;
