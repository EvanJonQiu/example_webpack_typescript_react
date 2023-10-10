# 其他配置

## tslib

### 安装
  ```
  npm install --save tslib
  ```
  or
  ```
  yarn add --save tslib
  ```
### 配置
修改tsconfig.json文件如下：
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
    "paths": {
      "tslib": ["./node_modules/tslib/tslib.d.ts"]
    },
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

## 引入图片定义（for ts)
在tsconfig.js中加入`include`配置项
```
"include":[
    "./src/**/*",
    "./src/images.d.ts",
    "./src/index.d.ts"
  ],
```

在项目的/src目录下创建images.d.ts和index.d.ts

images.d.ts:

```typescript
declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
declare module "*.gif";
declare module "*.jpeg";
```

index.d.ts:

```typescript
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
```

## 目录别名

为了方便在代码中引用其他文件，可以在webpack的配置文件中为目录定义别名，例如，为`src/utils`定义别名`@utils`

```javascript
  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "./src/utils/"),
      "@app": path.resolve(__dirname, "./src/")
    },
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"]
  },
```

这样在代码中使用别名引入模块或文件：
```javascript
import utils from "@utils/xxxx"
```

同时应该在tsconfing.json中，也添加相应的别名定义

```
  "paths": {
      "@utils/*": ["./src/utils/*"],
      "@app/*": ["./src/*"],
      "tslib": ["./node_modules/tslib/tslib.d.ts"]
    },
```