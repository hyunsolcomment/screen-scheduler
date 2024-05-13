"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const schedule_1 = require("./modules/schedule");
const notification_1 = require("./modules/notification");
electron_1.app.commandLine.appendSwitch('lang', 'ko-KR');
electron_1.ipcMain.on('notification', (e, args) => notification_1.Noti.onReceive(args));
electron_1.app.whenReady().then(async () => {
    await schedule_1.Schedule.init();
    await schedule_1.Schedule.load();
    schedule_1.Schedule.start();
    electron_1.app.on('window-all-closed', () => {
        electron_1.app.exit();
    });
});
