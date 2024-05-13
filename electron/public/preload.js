"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const fs = require("fs-extra");
const path = require("path");
const global_1 = require("./global");
electron_1.contextBridge.exposeInMainWorld('electron', {
    send(channel, data) {
        electron_1.ipcRenderer.send(channel, data);
    },
    receive(channel, data) {
        electron_1.ipcRenderer.on(channel, data);
    },
    async getAudioFileAsURL(file) {
        const filePath = path.join(global_1.Global.rootPath, file);
        // 해당 파일이 존재하는 지 확인 
        if (await fs.exists(filePath)) {
            const base64 = await fs.readFile(filePath, 'base64');
            return `data:audio/mp3;base64,${base64}`;
        }
        else {
            console.error(`'${filePath}' 경로의 파일을 찾을 수 없습니다.`);
            return undefined;
        }
    }
});
