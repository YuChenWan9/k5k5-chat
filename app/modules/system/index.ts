// modules
import { ipcMain, screen } from "electron";

// types
import type { ModuleFunction } from "@app/app";
import type { AuthControlAction } from "@app/types";

import { WindowBaseOptions } from "../../config";

/**
 * 操作窗口相关方法
 */
const SystemModule: ModuleFunction = (context) => {
  ipcMain.on("auth-control", (_, action: AuthControlAction) => {
    context.mainWindow?.destroy();

    switch (action) {
      case "login":
        context.createWindow({
          options: {
            ...WindowBaseOptions,
            width: 960,
            height: 704,
            minHeight: 540,
            minWidth: 840,
            resizable: true,
            maximizable: true,
          },
          isLogin: true
        });

        context.mainWindow?.webContents.openDevTools();

        break;
      case "logout":
        context.createWindow({ path: "login", isLogin: false });
        break;

      default:
        break;
    }
  });

  ipcMain.on("win-show", () => {
    context.mainWindow?.restore();
    context.mainWindow?.center();
  });

  ipcMain.on("app-win-resize", (_, allowResize: boolean) => {
    if (!allowResize) return;

    if (context.mainWindow?.isMaximized()) {
      context.mainWindow?.unmaximize();
      return;
    }
    context.mainWindow?.maximize();
  });

  /* 窗口移动 */
  const winStartPosition = { x: 0, y: 0 };
  const mouseStartPosition = { x: 0, y: 0 };
  let movingInterval: NodeJS.Timer | null = null;
  ipcMain.on("app-win-move", (_, allowMove: boolean) => {
    if (allowMove) {
      const windowPosition = context.mainWindow?.getPosition() as Array<number>;
      winStartPosition.x = windowPosition[0];
      winStartPosition.y = windowPosition[1];
      mouseStartPosition.x = screen.getCursorScreenPoint().x;
      mouseStartPosition.y = screen.getCursorScreenPoint().y;

      if (movingInterval) {
        clearInterval(movingInterval);
      }

      movingInterval = setInterval(() => {
        const cursorPosition = screen.getCursorScreenPoint();
        const x = winStartPosition.x + cursorPosition.x - mouseStartPosition.x;
        const y = winStartPosition.y + cursorPosition.y - mouseStartPosition.y;
        context.mainWindow?.setPosition(x, y);
      }, 20);
    } else {
      clearInterval(Number(movingInterval));
      movingInterval = null;
    }
  });
};

export default SystemModule;
