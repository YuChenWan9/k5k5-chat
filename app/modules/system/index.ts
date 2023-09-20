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
    context.mainWindow?.setResizable(true);
    context.mainWindow?.setSize(1, 1);

    context.mainWindow?.close();

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
          path: "home",
          isLogin: true
        });

        // context.mainWindow?.setResizable(true);
        // context.mainWindow?.setResizable(true);
        // context.mainWindow?.setMaximizable(true);
        // context.mainWindow?.setMinimumSize(840, 540);
        // context.mainWindow?.setSize(960, 704);
        // context.mainWindow?.center();
        // context.mainWindow?.webContents.send('set-login', false);

        break;
      case "logout":
        // context.mainWindow?.setMinimumSize(320, 448);
        // context.mainWindow?.setSize(320, 448);
        // context.mainWindow?.setResizable(false);
        // context.mainWindow?.setMaximizable(false);
        // context.mainWindow?.center();

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
