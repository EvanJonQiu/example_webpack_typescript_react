const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");

module.exports = merge(common, {
  devtool: "inline-source-map",
  devServer: {
    //contentBase: "./dist",
    open: true,
    host: "0.0.0.0",
    port: 9000,
    hot: true,
    historyApiFallback: true,
    //public: "localhost:9000",
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        host: "localhost",
        port: 9000,
        disableHostCheck: true,
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
        withCredentials: true,
        secure: false,
        //cookieDomainRewrite: "localhost:9000"
        // onProxyReq: proxyReq => {
        //   if (proxyReq.getHeader('origin')) {
        //     proxyReq.setHeader('origin', "http://localhost:8080");
        //   }
        // }
      }
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
