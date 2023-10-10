# IDE plugin

## 安装eslint and prettier

  ```
  npm install --save-dev eslint eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-react
  npm install --save-dev prettier
  npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
  ```
  or
  ```
  yarn add --dev eslint eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-react
  yarn add --dev prettier
  yarn add --dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
  ```

## 配置

### .editorconfig
```
[*]
charset = utf-8
insert_final_newline = true
trim_trailing_whitespace = true

[*.{tsx,ts,js,jsx,json}]
indent_style = space
indent_size = 2
```

### .eslintignore
```
\.git
\.vscode
node_modules
```

### .eslintrc
```
{
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": false
    },
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "@typescript-eslint/no-empty-function": 0,
    "react/display-name": 0,
    "@typescript-eslint/no-explicit-any": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "ignorePatterns": ["webpack.common.js", "webpack.config.js", "webpack.dev.js", "webpack.prod.js", "postcss.conig.js"]
}
```

### .prettierrc
```
{
  "trailingComma": "none",
  "semi": true,
  "printWidth": 120
}
```