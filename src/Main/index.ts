import { app } from "electron";
import { Logger } from "./Config/PathResolve";
import os from "os";
let isPackaged = require('electron-is-packaged').isPackaged;
import Example from "./Pages/Example";
import watch from "node-watch";
import path from "path";
import fs from "fs";

(() => {

    app.on("will-quit",() => {
        process.kill(process.pid);
        process.exit();
    });

    app.on("window-all-closed", () => {
        if (os.platform() === "darwin") return app.dock.hide();
    });

    app.commandLine.appendSwitch('disable-hid-blocklist');

    app.whenReady()
        .then(() => {
            Logger.info("app when ready in triggered");
            return Example();
        })
        .catch((error) => {
            Logger.error(`${error}`);
            return app.quit();
        });

})();