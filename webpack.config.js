const path = require("path")
const webpack = require("webpack")
const MyExampleWebpackPlugin = require("./plugins/test1")
module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "index.js"),
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.test$/,
                use: [path.resolve(__dirname, "./loader/testTojs.js")]
            },
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: "steady-x"
        }),
        new MyExampleWebpackPlugin({
            banner: 'test' 
        }),
        new webpack.ProgressPlugin({handler:(percentage, message, ...args) => {
            const tage = percentage*100 +"%"
            // console.info(tage);
        },percentBy:null})
    ]
}   