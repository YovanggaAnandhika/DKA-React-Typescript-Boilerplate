import electron, {app, BrowserWindow, ipcMain} from "electron";
import path, {join} from "path";
let isPackaged = require('electron-is-packaged').isPackaged;
import {Logger} from "../../Config/PathResolve";
import watch from "node-watch";
import fs from "fs";
import {Options, Server} from "@dkaframework/server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";


let exampleBrowserWindow : BrowserWindow | undefined;
async function Example() {

    exampleBrowserWindow = new BrowserWindow({
        width : 800,
        height : 600,
        show : false,
        webPreferences : {
            preload : path.join(__dirname,"./../../Interfaces/Example/index.preloader.js")
        }
    });

    exampleBrowserWindow?.webContents.on("did-finish-load", () => {
        /** register IPC Main Events **/
        ipcMain.on("WINDOW_MOUNT", (event, args) => {
            switch (args.name) {
                case "Example" :
                    exampleBrowserWindow?.show();
                    event.sender.send("EXAMPLE", { test : "hello world"})
                    break;
            }
        });
        /** register IPC Main Events **/
        ipcMain.on("WINDOW_UNMOUNT", (event, args) => {
            switch (args.name) {
                case "Example" :

                    break;
            }
        });

    })

    exampleBrowserWindow.on("close", () => {
        /** Unregister IPC Main Events **/
        ipcMain.removeAllListeners("WINDOW_MOUNT");
        ipcMain.removeAllListeners("WINDOW_UNMOUNT");
        exampleBrowserWindow = undefined;
    });

    exampleBrowserWindow?.on("closed", () => {
        app.quit();
    });

    // Load HTML Page From Compiler Webpack
    exampleBrowserWindow?.loadFile(path.join(__dirname,"../../../UI/","./index.html"),{ hash : "/example"})
        .catch((error) => {
            Logger.error(error);
        });

}
export default Example;