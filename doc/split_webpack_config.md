# 拆分webpack.config.js

为了方便开发和发布，将webpack.config.js进行拆分，方便工程可以按找开发模式或者生产模式进行编译。

## 步骤

### 创建文件

分别创建三个文件：
1. webpack.common.js
  包含通用配置
2. webpack.dev.js
  开发模式下的配置文件（运行时与webpack.common.js合并）
3. webpack.prod.js
   生产模式下的配置文件（运行时与webpack.common.js合并）

将webpack.config.js内容拷贝到webpack.common.js中，删除devServer配置项。

webpack-merge
  ```
  npm install --save-dev webpack-merge
  ```
  or
  ```
  yarn add --dev webpack-merge
  ```

在webpack.dev.js中添加如下内容：
```javascript
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
  }
});
```

修改package.json
```javascript
  "scripts": {
    "build": "webpack --mode production --config webpack.prod.js",
    "start": "webpack serve --mode development --config webpack.dev.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

安装terser
  ```
  npm install --save-dev terser-webpack-plugin
  ```
  or
  ```
  yarn add --dev terser-webpack-plugin
  ```

### webpack.prod.js
```javascript
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  devtool: undefined,
  // plugins: [
  //   new UglifyJSPlugin({
  //     sourceMap: true,
  //     cache: true
  //   })
  // ]
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true
      })
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      maxSize: 250000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    }
  }
});
```

## 发布路径

有的时候需要将站点发不到非根目录下，所以需要在webpack配置文件中配置publicPath参数

```javascript
...
module.exports = {
  mode: process.argv[mode_index + 1],
  entry: "./src/index.tsx",
  output: {
    filename: "[name]-bundle.js",
    publicPath: "/webportal",
    path: path.resolve(__dirname, "./dist")
  },
  ...
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      title: "Web Portal",
      filename: "index.html",
      favicon: "src/assets/gnu.png",
      publicPath: "/webportal/"
    }),
    new Co
```