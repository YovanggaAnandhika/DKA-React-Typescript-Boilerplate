import {contextBridge, ipcRenderer} from "electron";

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel : string, data : object) => {
            // whitelist channels
            let validChannels = [
                "EXAMPLE",
                "WINDOW_MOUNT",
                "WINDOW_UNMOUNT"
            ];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        on: (channel : string, func : (event : Electron.IpcRendererEvent, args : any[]) => void ) => {
            let validChannels = [
                "EXAMPLE",
                "WINDOW_MOUNT",
                "WINDOW_UNMOUNT"
            ];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, func);
            }
        },
        once : (channel : string, func : (event : Electron.IpcRendererEvent, args : any[]) => void ) => {
            let validChannels = [
                "EXAMPLE",
                "WINDOW_MOUNT",
                "WINDOW_UNMOUNT"
            ];
            if (validChannels.includes(channel)) {
                ipcRenderer.once(channel, func);
            }
        },
        removeAllListeners : (channel : string) => {
            ipcRenderer.removeAllListeners(channel)
        }
    }
);
