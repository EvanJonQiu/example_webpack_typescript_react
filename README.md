# 说明

自定义创建webpack + typescript + react工程。


## 步骤

### 创建工程目录，进入到目录当中，执行npm命令来初始化工程
  ```
  npm init -y
  ```
### webpack

这里将webpack安装到工程目录中。
  ```
  npm install --save-dev webpack webpack-cli
  ```
  or
  ```
  yarn add --dev webpack webpack-cli
  ```
### 创建文件

1. 创建webpack.config.js文件
```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "[name]-bundle.js",
    publicPath: "/",
    path: path.resolve(__dirname, "./dist")
  }
};
```

1. 创建index.ejs文件
```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
    <meta name="theme-color" content="#000000">
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```
### 安装样式插件
1. style-loader css-loader file-loader
  ```
  npm install --save-dev style-loader css-loader file-loader
  ```
  or
  ```
  yarn add --dev style-loader css-loader file-loader
  ```
2. sass-loader
  ```
  npm install --save-dev sass-loader node-sass sass-resources-loader
  ```
  or
  ```
  yarn add --dev sass-loader node-sass sass-resources-loader
  ```
3. less
  ```
  npm install --save-dev less less-loader
  ```
  or
  ```
  yarn add --dev less less-loader
  ```
4. 如果使用postcss-loader (可选)
  ```
  npm install --save-dev postcss-loader
  npm install --save-dev autoprefixer
  ```
5. mini-css-extract-plugin
  ```
  npm install --save-dev mini-css-extract-plugin
  ```
  or
  ```
  yarn add --dev mini-css-extract-plugin
  ```
6. html-webpack-plugin
  ```
  npm install --save-dev html-webpack-plugin
  ```
  or
  ```
  yarn add --dev html-webpack-plugin
  ```
7. clean-webpack-plugin
  ```
  npm install --save-dev clean-webpack-plugin
  ```
  or
  ```
  yarn add --dev clean-webpack-plugin
  ```
8. url-loader
  ```
  npm install --save-dev url-loader
  ```
  or
  ```
  yarn add --dev url-loader
  ```
9. 修改配置
```javascript
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name]-bundle.js",
    publicPath: "/",
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          //{ loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          //"postcss-loader",
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: [path.resolve(__dirname, "./src/global.scss")]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "less-loader"
        ]
      }
    ]
  },
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
    })
  ]
};
```
### react
  ```
  npm install --save react react-dom react-router-dom
  npm install --save-dev @types/react @types/react-dom @types/react-router-dom
  ```
  or
  ```
  yarn add --save react react-dom react-router-dom
  yarn add --dev @types/react @types/react-dom @types/react-router-dom
  ```
### typescript
  ```
  npm install --save-dev typescript ts-loader
  ```
  or
  ```
  yarn add --dev typescript ts-loader
  ```

创建tsconfig.json文件
```
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "sourceMap": true,
    "jsx": "react",
    "importHelpers": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "baseUrl": ".",
    // arcgis api
    //"lib": ["ES2019", "DOM"],
    //"noImplicitAny": true,
    //"jsxFactory": "tsx",
    //"experimentalDecorators": true,
    //"preserveConstEnums": true,
    //"suppressImplicitAnyIndexErrors": true
  },
  "include":[
    "./src/**/*",
    "./src/images.d.ts",
    "./src/index.d.ts"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```
### 使用babel

使用babel
  ```
  npm install --save-dev @babel/core @babel/cli @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-typescript
  npm install --save-dev babel-loader
  npm install --save-dev @babel/preset-react
  ```
  or
  ```
  yarn add --dev @babel/core @babel/cli @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-typescript babel-loader @babel/preset-react
  ```

For different configuration:
  - only use ts-loader
  - only use babel-loader
  - babel-loader and ts-loader can work together.

创建.babelrc文件
```
{
  "presets": [
    ["@babel/preset-env", {"targets": {"node": "current"} }],
    "@babel/preset-react",
    "@babel/typescript"
  ],
  "plugins": [
      "@babel/proposal-class-properties"
  ]
}
```

在webpack.config.js中添加配置
```
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/, 
        include: [path.resolve(__dirname, "src")],
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader"
          }
        ]
      },
      ...
    ]
  }
};
```
### dev-server
  ```
  npm install --save-dev webpack-dev-server
  ```
  or
  ```
  yarn add --dev webpack-dev-server
  ```

修改配置文件：
```javascript
...
module.exports = {
  ...
  ,
  devtool: isDev ? "source-map" : undefined,
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 9000,
    hot: true,
    historyApiFallback: true,
  },
  watch: isDev ? true : false,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000
  }
}
```

修改package.json文件
```
{
  "name": "webportal",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack serve --mode development --config webpack.config.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^6.7.1",
    "html-webpack-plugin": "^5.5.0",
    "less": "^4.1.3",
    "less-loader": "^11.0.0",
    "mini-css-extract-plugin": "^2.6.1",
    "node-sass": "^7.0.1",
    "sass-loader": "^13.0.2",
    "sass-resources-loader": "^2.2.5",
    "style-loader": "^3.3.1",
    "url-loader": "^4.1.1",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0",
    "webpack-dev-server": "^4.9.3"
  }
}
```

### [拆分webpack.config.js](./doc/split_webpack_config.md)
### [使用的webpack plugin](./doc/webpack_plugin.md)
### [一些webpack配置](./doc/config_webpack.md)
### [UI测试](./doc/ui_test.md)
### [IDE plugin](./doc/ide_plugin.md)
### [UI 框架](./doc/ui_framework.md)
