import { BrowserWindow, app } from "electron";
import { Global } from "../global";
import * as path from 'path';

export class Noti {
    static create({ title, desc, audio }: { title: string, desc?: string, audio?: string }) {

        const req = `#/noti?title=${title}&desc=${desc ?? ""}&audio=${audio ?? "audio/default_alert.wav"}`;
    
        if(!Global.notiWindow) {

            console.log('root path:',Global.rootPath);

            Global.notiWindow = new BrowserWindow({
                width: 500,
                height: 300,
                webPreferences: {
                    nodeIntegration: true,
                    preload: path.join(Global.rootPath, 'preload.js')
                },
                icon: path.join(Global.rootPath, "..", "..", "assets", "icons","icon.ico"),
                center         : true,
                frame          : false,
                hasShadow      : false,
                closable       : false,
                fullscreenable : false,
                movable        : false,
                resizable      : false,
                alwaysOnTop    : true,
                transparent    : true,
                skipTaskbar    : true
            });
        
            Global.notiWindow.setMenuBarVisibility(false);
            //Global.notiWindow.setIgnoreMouseEvents(true);
        }

        Global.notiWindow.show();
    
        if(app.isPackaged) {
    
            // 빌드된 환경
            Global.notiWindow.loadFile(path.join(Global.rootPath,`index.html${req}`));
    
        } else {
    
            //Global.notiWindow.webContents.openDevTools();
            
            // 개발 환경
            Global.notiWindow.loadURL(`http://localhost:3000${req}`);
        }
    }

    static close() {
        if(Global.notiWindow) {
            Global.notiWindow.hide();
        }
    }

    static onReceive(action: string) {
        switch(action) {
            case 'close':
                Noti.close();
                break;
        }
    }
}