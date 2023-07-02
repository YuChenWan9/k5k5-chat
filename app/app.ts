import { app, BrowserWindow } from 'electron';
import { join } from 'path';

class AppContext {

    // is mac os
    readonly IS_MAC = process.platform === 'darwin';

    // dev mode - url
    readonly DEV_URL = `http://localhost:3000/`;

    // production mode - load file
    readonly PROD_LOAD_FILE_PATH = join(__dirname, '../index.html');

    // electron window
    mainWindow: BrowserWindow | null = null;

    async bootstrap() {
        await this.init();
        await this.createWindow();
    }

    async init() {

        app.on('activate', () => {
            if(BrowserWindow.getAllWindows().length === 0) this.createWindow();
        })

        app.on('window-all-closed', () => {
            if(!this.IS_MAC) app.quit();
        })

        await app.whenReady();
    }

    async createWindow() {
        if(this.mainWindow) return;
        
        this.mainWindow = new BrowserWindow({
            width: 800,
            height: 800
        })

        if(app.isPackaged) {
            this.mainWindow.loadFile(this.PROD_LOAD_FILE_PATH);
        } else {
            this.mainWindow.loadURL(this.DEV_URL);
        }

    }
}

export default AppContext;