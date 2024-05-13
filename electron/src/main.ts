import { app, BrowserWindow, ipcMain } from "electron";
import { join } from 'path';
import { Global } from "./global";
import { Schedule } from "./modules/schedule";
import { Noti } from "./modules/notification";

app.commandLine.appendSwitch('lang', 'ko-KR');

ipcMain.on('notification', (e, args) => Noti.onReceive(args))

app.whenReady().then(async () => {

    await Schedule.init();
    await Schedule.load();
    
    Schedule.start();

    app.on('window-all-closed', () => {
        app.exit();
    })
})