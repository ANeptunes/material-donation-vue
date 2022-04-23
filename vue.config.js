// 添加全局配置文件
const path = require('path');
const webpack = require("webpack")

module.exports = {
    // 关闭esList语法检测功能
    lintOnSave: false,
    devServer: {
        host: '127.0.0.1',
        // 配置静态资源目录
        contentBase: path.join(__dirname, 'public'),
        // 设置开发服务器的端口号
        port: 8848,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        hotOnly: false,
        disableHostCheck: true
    },
    // 配置WebPack相关
    configureWebpack: {
        // 解析
        resolve: {
            // 配置路径别名
            alias: {
                '@v': path.resolve(__dirname, 'src/views/'),
                '@c': path.resolve(__dirname, 'src/components/')
            }
        },
        //支持jquery
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                jquery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    },
}