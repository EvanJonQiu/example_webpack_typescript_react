# UI 测试

## 安装

    ```
  npm install --save-dev @testing-library/jest-dom @testing-library/react @testing-library/react-hooks @types/jest
  npm install --save-dev jest jest-dom react-test-renderer
  npm install --save-dev ts-jest ts-node jest-environment-jsdom
  npm install --save-dev identity-obj-proxy
  ```
  or
  ```
  yarn add --dev @testing-library/jest-dom @testing-library/react @testing-library/react-hooks @types/jest
  yarn add --dev jest jest-dom react-test-renderer
  yarn add --dev ts-jest ts-node jest-environment-jsdom
  yarn add --dev identity-obj-proxy
  ```

## 配置

在工程目录下创建test.config.js文件：

```javascript
module.exports = {
  rootDir: ".",
  roots: ["<rootDir>/test/"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testRegex: "test/(.+)\\.test\\.(jsx?|tsx?)$",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    ".+\\.(css|less|scss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png)$": "<rootDir>/__mocks__/fileMock.tsx",
    "^@app/(.*)$": "<rootDir>/src/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleDirectories: ["node_modules", "src"]
};
```

使用jest.config.ts文件:

```javascript
import type { Config } from "jest";

const config: Config = {
  rootDir: "./src",
  roots: ["<rootDir>/__test__/"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/"],
  testRegex: "__test__/(.+)\\.test\\.(jsx?|tsx?)$",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    ".+\\.(css|less|scss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png)$": "<rootDir>/__mocks__/fileMock.tsx",
    "^@app/(.*)$": "<rootDir>/$1",
    "^@utils/(.*)$": "<rootDir>/utils/$1"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleDirectories: ["node_modules", "src"]
};

export default config;
```


所有的测试代码都放到/test目录下。

在工程目录中创建__mocks__目录，在里面创建filemock.tsx文件，里面加入如下内容：

```typescript
module.exports = "test-file-stub";
```

