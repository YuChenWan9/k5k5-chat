import { app, BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import { join } from "path";
import { globImport } from "./utils/import";
import { WindowBaseOptions } from "./config";

// types
export type AppContextType = InstanceType<typeof AppContext>;
export type ModuleFunction = (context: AppContextType) => void | Promise<void>;

class AppContext {
  // is mac os
  readonly IS_MAC = process.platform === "darwin";

  private willQuit = false;

  // dev mode - url
  readonly DEV_URL = `http://localhost:10000/`;

  // production mode - load file
  readonly PROD_LOAD_FILE_PATH = join(__dirname, "../index.html");

  // electron window
  mainWindow: BrowserWindow | null = null;

  async bootstrap() {
    await this.init();
    await this.autoload();
    await this.createWindow();
  }

  async init() {
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow();
      } else {
        this.mainWindow?.show();
        this.willQuit = false;
      }
    });

    app.on("window-all-closed", () => {
      if (!this.IS_MAC) {
        app.quit();
      }
    });

    await app.whenReady();
  }

  async createWindow(config?: {
    options?: BrowserWindowConstructorOptions;
    path?: string;
    isLogin?: boolean
  }) {
    this.mainWindow = new BrowserWindow(
      config?.options ? config?.options : WindowBaseOptions
    );

    // this.mainWindow.webContents.openDevTools();
    this.mainWindow.on("close", (e: { preventDefault: () => void }) => {
      if (!this.willQuit) {
        e.preventDefault();
        this.willQuit = true;
        this.mainWindow?.hide();
        this.mainWindow?.setSkipTaskbar(true);
      }
    });

    this.mainWindow.on("ready-to-show", () => this.mainWindow?.show());

    if (app.isPackaged) {
      await this.mainWindow.loadFile(
        `${this.PROD_LOAD_FILE_PATH}${config?.path ?? ""}`
      );
    } else {
      await this.mainWindow.loadURL(
        `${this.DEV_URL}${config?.path ?? ""}`
      );
    }
    this.mainWindow.webContents.send('set-login', config?.isLogin ?? false)
  }

  async register(module: ModuleFunction) {
    await module(this);
  }
  async autoload() {
    const modules = await globImport("./modules/**/index.js", {
      cwd: __dirname,
    });
    await Promise.all(
      modules.map(({ default: module }) => this.register(module))
    );
  }
}

export default AppContext;
