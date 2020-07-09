// eslint-disable-next-line no-unused-vars
const path = require("path");
// eslint-disable-next-line no-unused-vars
const Webpack = require("webpack");
// eslint-disable-next-line no-unused-vars
const WebpackBar = require("webpackbar");
// eslint-disable-next-line no-unused-vars
// const FileManagerPlugin = require("filemanager-webpack-plugin");
const {
    title,
    publicPath,
    assetsDir,
    outputDir,
    devPort
} = require("./src/config/settings")
const {
    author
} = require("./package.json")

process.env.VUE_APP_TITLE = title || "vue-admin-beautiful-copy";
process.env.VUE_APP_AUTHOR = author || "zmheang";

function resolve(dir) {
    return path.join(__dirname, dir);
}

function mockServer() {
    if (process.env.NODE_ENV === "development") {
        const mockServer = require("./mock/mockServer.js");
        return mockServer;
    } else {
        return "";
    }
}

module.exports = {
    publicPath,
    assetsDir,
    outputDir,
    devServer: {
        hot: true,
        port: devPort,
        open: true,
        noInfo: false,
        overlay: {
            warnings: true,
            errors: true,
        },
        after: mockServer(),
    },
    // eslint-disable-next-line no-unused-vars
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            return {
                resolve: {
                    alias: {
                        "@": resolve("src"),
                        "^": resolve("src/components"),
                    },
                },
                plugins: [
                    new WebpackBar({name:'\u9879\u76ee\u542f\u52a8\u4e2d\u002e\u002e\u002e'})
                ]
            }
        } else {
            // 为开发环境修改配置...
            return {
                resolve: {
                    alias: {
                        "@": resolve("src"),
                        "^": resolve("src/components"),
                    },
                },
                plugins: [
                    new WebpackBar({name:'\u9879\u76ee\u542f\u52a8\u4e2d\u002e\u002e\u002e'})
                ]
            }
        }
    },
    css: {
        requireModuleExtension: true,
        sourceMap: true,
        loaderOptions: {
            scss: {
                prependData: '@import "~@/styles/variables.scss";',
            },
        },
    },
};