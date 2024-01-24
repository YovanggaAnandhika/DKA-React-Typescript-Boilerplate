import {Configuration, build, Platform} from "electron-builder";
import * as path from "path";

(() => {

    let rootPath = __dirname;

    let configuration : Configuration = {
        compression : "maximum",
        productName : "DKAParkingAdmin",
        executableName : "DKAParkingAdmin",
        directories : {
            output : path.join(rootPath, "release/${os}/${arch}")
        },
        artifactName : "${productName}-${os}-${arch}-${version}.${ext}",
        nsis : {
            license : path.join(rootPath, "dist/LICENCE.txt"),
            oneClick : false,
            perMachine : true,
            allowElevation : true,
            deleteAppDataOnUninstall : true,
            allowToChangeInstallationDirectory : true
        },
        win : {
            icon : path.join(rootPath,"dist/Assets/icon.ico"),
            requestedExecutionLevel : "requireAdministrator",
            target : [
                {
                    target : "nsis",
                    arch : [
                        "x64",
                        "arm64",
                        "ia32"
                    ]
                }
            ]
        },
        linux : {
            category : "Utility",
            icon : path.join(rootPath,"dist/Assets/icon.ico"),
            executableName : "DKAParkingAdmin",
            target : [
                {
                    target : "tar.gz",
                    arch : [
                        "x64",
                        "arm64",
                        "ia32",
                        "armv7l"
                    ]
                },
                {
                    target : "deb",
                    arch : [
                        "x64",
                        "arm64",
                        "ia32",
                        "armv7l"
                    ]
                }
            ]
        },
        "files": [
            `!src/*`,
            "!release/*"
        ],
        extraFiles : [
            {
                from : "src/Extra",
                to : ".",
                filter : [
                    "**/*"
                ]
            }
        ]
    }

    build({
        targets : Platform.WINDOWS.createTarget(),
        config : configuration
    })
        .then((resultCompile) => {
            console.log(resultCompile)
        })
        .catch((error) => {
            console.error(error)
        })
})();