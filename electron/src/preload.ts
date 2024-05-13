import { contextBridge, ipcRenderer } from "electron";
import * as fs from 'fs-extra';
import * as path from 'path';
import { Global } from "./global";

contextBridge.exposeInMainWorld('electron', {
    send(channel: string, data: any) {
        ipcRenderer.send(channel, data);
    },

    receive(channel: string, data: any) {
        ipcRenderer.on(channel, data);
    },

    async getAudioFileAsURL(file: string) {

        const filePath = path.join(Global.rootPath,file);

        // 해당 파일이 존재하는 지 확인 
        if(await fs.exists(filePath)) {
            const base64 = await fs.readFile(filePath, 'base64');

            return `data:audio/mp3;base64,${base64}`;
        } else {
            console.error(`'${filePath}' 경로의 파일을 찾을 수 없습니다.`)
            return undefined;
        }
    }
});