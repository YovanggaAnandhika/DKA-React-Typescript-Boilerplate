import path from "path";
import {app} from "electron";
import winston from "winston";
import fs from "fs";
const isPackaged = require("electron-is-packaged").isPackaged;

export const PathConfiguration = {
    Temp : (!isPackaged) ? path.join(process.cwd(),"src","Cache") : path.join(app.getPath("exe"),"..", "session"),
    Config : (!isPackaged) ? path.join(process.cwd(),"src","Config") : path.join(app.getPath("exe"),"..", "config"),
    Logs : (!isPackaged) ? path.join(process.cwd(),"src","Extra","Logs") : path.join(app.getPath("exe"),"..", "logs"),
    Database : (!isPackaged) ? path.join(process.cwd(),"src","Database") : path.join(app.getPath("exe"),"..", "database"),
}
export const SubPathConfiguration = {
    Certificate : (fs.existsSync(path.join(PathConfiguration.Config,"certificate"))) ? path.join(PathConfiguration.Config,"certificate") :
        path.join(__dirname,"../../Config/certificate"),
    Keys : (fs.existsSync(path.join(PathConfiguration.Config,"keys"))) ? path.join(PathConfiguration.Config,"keys") :
        path.join(__dirname,"../../Config/keys"),
}

console.log(SubPathConfiguration.Keys)

export const Logger = winston.createLogger({
    format : winston.format.combine(
        winston.format.timestamp({ format: 'HH:mm:ss DD:MM:YYYY' }),
        winston.format.printf(info => `[${info.timestamp}] - ${info.level.toUpperCase()} - ${info.message}`)
    ),
    transports: (!isPackaged) ? [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join(PathConfiguration.Logs,'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(PathConfiguration.Logs,'info.log'), level: 'info' }),
    ] : [
        new winston.transports.File({ filename: path.join(PathConfiguration.Logs,'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(PathConfiguration.Logs,'info.log'), level: 'info' }),
    ],
});