interface Window {
    electron: {
        send: (channel: string, data: any) => void,
        receive: (channel: string, data: any) => void,
        getAudioFileAsURL: (path: string) => Promise<string>
    }
}