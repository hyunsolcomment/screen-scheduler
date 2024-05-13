import * as fs from 'fs-extra';
import * as path from 'path';
import { Global } from '../global';
import { Noti } from './notification';

interface ISchedule {
    h: number, 
    m: number, 
    s?: number, 
    title: string, 
    desc?: string, 
    audio?: string,
    always?: boolean
}

type Schedules = ISchedule[];

export class Schedule {

    private static lastNotification: string = "";
    private static schedules: Schedules = [];

    static async init() {

        const dataFolder = Schedule.getDataFolderPath();

        if(!await fs.exists(dataFolder)) {
            await fs.mkdir(dataFolder);
            console.log('data folder created')
        }

        const json = Schedule.getJsonPath();

        if(!await fs.exists(json)) {
            await fs.writeFile(json, '[]', 'utf-8');
            console.log('schedules.json created.')
        }
    }

    static getDataFolderPath() {
        return path.join(Global.rootPath, 'data')
    }

    static getJsonPath() {
        return path.join(Schedule.getDataFolderPath(), 'schedules.json');
    }

    static async load() {
        let str = await fs.readFile(Schedule.getJsonPath(),'utf-8');
        let json = JSON.parse(str);

        Schedule.schedules = json;

        console.log(`load schedules (${Schedule.schedules.length})`);

    }

    static start() {

        console.log("start schedule");

        setInterval(() => {
            for(let {h, m, s, title, desc, audio, always} of Schedule.schedules) {
                const now = new Date();
                
                const flag = (
                    h === now.getHours()   && 
                    m === now.getMinutes() && 
                    (s === undefined || (s !== undefined && s === now.getSeconds()))
                ) || (always ?? false)

                if(flag) {
                    let notiStr = `${h}:${m}`;

                    if(s !== undefined) {
                        notiStr += `:${s}`;
                    }

                    if(Schedule.lastNotification !== notiStr) {
                        console.log(`[notification] h: ${h}, m: ${m}, s: ${s}, title: ${title}, desc: ${desc}, audio: ${audio}`);
                        Noti.create({ title, desc, audio });
                        Schedule.lastNotification = notiStr;
                    }
                }
            }
        }, 1000)
    }
}