const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: "ts-loader"
        }]
    },
    resolve: {
        extensions: [".ts"]
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist")
    }
};
