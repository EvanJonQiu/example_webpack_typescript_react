# webpack plugin

## copy-webpack-plugin

使用copy-webpack-plugin可以在webpack打包完成后会把静态资源复制到dist文件夹下。
  ```
  npm install --save-dev copy-webpack-plugin
  ```
  or
  ```
  yarn add --dev copy-webpack-plugin
  ```

## webpack.HotModuleReplacementPlugin

需要在webpack.dev.js加入如下配置项：
```javascript
module.exports = merge(common, {
  ...
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
```