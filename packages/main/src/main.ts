import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';

class ElectronMain {
    main() {
        const isSingleInstance = app.requestSingleInstanceLock();
        if (!isSingleInstance) {
            app.quit();
            process.exit(0);
        }
        app.on('second-instance', () => {
            this.createWindow().catch((err) => console.error('Error while trying to prevent second-instance Electron event:', err));
        });

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });

        app.on('activate', () => {
            this.createWindow().catch((err) => console.error('Error while trying to handle activate Electron event:', err));
        });

        app.whenReady()
            .then(() => {
                return this.createWindow();
            })
            .catch((e) => console.error('Failed to create window:', e));
    }

    async createWindow() {
        const browserWindow = new BrowserWindow({
            show: false,
            width: 1200,
            height: 768,
            webPreferences: {
                webviewTag: false,
                // Electron current directory will be at `dist/main`, we need to include
                // the preload script from this relative path: `../preload/index.cjs`.
                preload: path.join(__dirname, '../preload/index.cjs'),
            },
        });

        // If you install `show: true` then it can cause issues when trying to close the window.
        // Use `show: false` and listener events `ready-to-show` to fix these issues.
        // https://github.com/electron/electron/issues/25012
        browserWindow.on('ready-to-show', () => {
            browserWindow?.show();
        });

        // Define the URL to use for the `BrowserWindow`, depending on the DEV env.
        const pageUrl = import.meta.env.DEV
            ? 'http://localhost:3000'
            : new URL('../dist/renderer/index.html', `file://${__dirname}`).toString();

        await browserWindow.loadURL(pageUrl);

        return browserWindow;
    }
}

if (app) {
    const main = new ElectronMain();
    main.main();
}

export function sayHello(): string {
    return 'hello';
}
