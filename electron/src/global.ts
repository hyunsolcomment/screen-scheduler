import { BrowserWindow } from "electron";

export class Global {
    static notiWindow: BrowserWindow;
    static rootPath: string = __dirname;
}