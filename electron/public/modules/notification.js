"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Noti = void 0;
const electron_1 = require("electron");
const global_1 = require("../global");
const path = require("path");
class Noti {
    static create({ title, desc, audio }) {
        const req = `#/noti?title=${title}&desc=${desc ?? ""}&audio=${audio ?? "audio/default_alert.wav"}`;
        if (!global_1.Global.notiWindow) {
            console.log('root path:', global_1.Global.rootPath);
            global_1.Global.notiWindow = new electron_1.BrowserWindow({
                width: 500,
                height: 300,
                webPreferences: {
                    nodeIntegration: true,
                    preload: path.join(global_1.Global.rootPath, 'preload.js')
                },
                icon: path.join(global_1.Global.rootPath, "..", "..", "assets", "icons", "icon.ico"),
                center: true,
                frame: false,
                hasShadow: false,
                closable: false,
                fullscreenable: false,
                movable: false,
                resizable: false,
                alwaysOnTop: true,
                transparent: true,
                skipTaskbar: true
            });
            global_1.Global.notiWindow.setMenuBarVisibility(false);
            //Global.notiWindow.setIgnoreMouseEvents(true);
        }
        global_1.Global.notiWindow.show();
        if (electron_1.app.isPackaged) {
            // 빌드된 환경
            global_1.Global.notiWindow.loadFile(path.join(global_1.Global.rootPath, `index.html${req}`));
        }
        else {
            global_1.Global.notiWindow.webContents.openDevTools();
            // 개발 환경
            global_1.Global.notiWindow.loadURL(`http://localhost:3000${req}`);
        }
    }
    static close() {
        if (global_1.Global.notiWindow) {
            global_1.Global.notiWindow.hide();
        }
    }
    static onReceive(action) {
        switch (action) {
            case 'close':
                Noti.close();
                break;
        }
    }
}
exports.Noti = Noti;
