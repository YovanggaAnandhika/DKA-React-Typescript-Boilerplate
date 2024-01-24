import {Options, Server} from "@dkaframework/server";
// @ts-ignore
import TerserPlugin from "terser-webpack-plugin";
import * as path from "path";
// @ts-ignore
import HtmlWebpackPlugin from "html-webpack-plugin";
// @ts-ignore
import WebpackObfuscator from "webpack-obfuscator";
import {join} from "path";

(async () => {
    await Server({
        state : Options.STATE.PRODUCTION,
        engine : Options.ENGINE.WEBPACK,
        mode : Options.MODE.MODE_COMPILE,
        webpack : {
            mode : "production",
            entry : path.join(process.cwd(),"src/UI/Routes/index.tsx"),
            output : {
                path : join(process.cwd(),"dist/UI"),
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: path.join(process.cwd(), "src/UI/Public/index.html"),
                    inject : "body"
                }),
            ],
            optimization: {
                minimize: true,
                minimizer: [new TerserPlugin({
                    terserOptions : {
                        compress: {
                            drop_console: false,
                        },
                        keep_fnames: true,
                    }
                })],
                mergeDuplicateChunks : true,
            },
        }
    }).then(async (resultServ) => {
        console.log("compile success");
    }).catch((error) => {
        console.error("compile error")
    });
})();