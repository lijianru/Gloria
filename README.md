# react 模版工程

## 概述

使用 vite 搭建一个 react 模版工程。

- [x] vite
- [x] react
- [x] react-router-dom
- [x] ant-design
- [x] eslint
- [x] prettier
- [x] storybook
- [x] tailwindcss
- [x] redux
- [ ] axios

## 具体步骤

### 创建项目

```
yarn create vite react-template-use-vite --template react-ts
```

### 清理 src 目录

删除 src 目录下无用的文件，组织新的文件夹目录。

### 使用 css modules

- 将 `*.css` 改为 `*.module.css`
- 修改使用 css 方式

```diff
- import './App.css'
+ import styles from './App.module.css';
```

### 安装 rect-router-dom

- 安装所需依赖项

```
yarn add react-router-dom
yarn add @types/react-router-dom -D
```

- 参阅[文档](https://reactrouter.com/web/guides/quick-start)创建 router 和对应的页面

### 安装 ant-design

- 安装所需的依赖

```
yarn add antd

yarn add vite-plugin-style-import less -D
```

- 修改 vite 配置

```diff
+import vitePluginImp from 'vite-plugin-imp';

 export default defineConfig({
   plugins: [
     reactRefresh(),
+    styleImport({
+      libs: [
+        {
+          libraryName: 'antd',
+          esModule: true,
+          resolveStyle: (name) => {
+            return `antd/es/${name}/style/index`;
+          },
+        },
+      ],
+    }),
   ],
+  css: {
+    preprocessorOptions: {
+      less: {
+        javascriptEnabled: true,
+      },
+    },
+  },
 });
```

### 环境变量

```diff
// 修改脚本
"scripts": {
-  "start": "vite",
+  "start": "vite --mode dev",
-  "build": "tsc && vite build",
+  "build:test": "vite build --mode test",
+  "build:prod": "vite build --mode production",
   "serve": "vite preview"
},

// 获取
const env = process.argv[process.argv.length - 1]
```

### 路径别名

- 安装所需依赖

```
yarn add @types/node -D
```

- 修改 tsconfig.json 配置

```diff
{
  compilerOptions: {
+    "baseUrl": "./src",
+    "paths": {
+      "pages": ["pages/*"],
+      "components": ["components/*"]
+    }
  }
}
```

- 修改 vite.config.js 配置

```diff
+ resolve: {
+  alias: {
+    pages: path.resolve(__dirname, 'src/pages'),
+    components: path.resolve(__dirname, 'src/components'),
+  },
+ },
```

### eslint

- 安装所需依赖

```
yarn add eslint -D
```

- 初始化 eslint 配置

```
eslint --init
// 将生成一份eslint配置文件
// ✔ How would you like to use ESLint? · problems
// ✔ What type of modules does your project use? · esm
// ✔ Which framework does your project use? · react
// ✔ Does your project use TypeScript? · Yes
// ✔ Where does your code run? · browser
// ✔ What format do you want your config file to be in? · JSON
// ✔ Would you like to install them now with npm? · Yes
```

- 添加脚本到 package.json

```diff
+ "eslint": "eslint src"
```

- 添加如下配置到 eslintrc.json

```diff
+ "settings": {
+   "react": {
+     "version": "detect" // 自动检测react版本
+   }
+ },
+ "rules": {
+   "@typescript-eslint/explicit-module-boundary-types": 0,
+   "react/display-name": 0
+ }
```

### prettier

- 安装所需依赖

```
yarn add --dev --exact prettier
```

- 生成配置文件

```
echo {}> .prettierrc.json
```

- 排除不需要格式化的文件目录

```
echo > .prettierignore
```

- 添加脚本

```diff
+ "prettier": "prettier --config ./.prettierrc.json --write 'src/**/*.@(js|ts)?(x)'"
```

### storybook

- 安装所需依赖

```
yarn add storybook
```

- 初始化 storybook 配置

```
npx sb init
// 上面的命令将对您的本地环境进行以下更改：
// - 安装所需的依赖项。
// - 设置必要的脚本来运行和构建 Storybook。
// - 添加默认的 Storybook 配置。
// - 添加一些样板story以帮助您入门。
```

- 清理默认的样板 story，并修改.storybook 中的 main.js 配置

```
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'], // 修改引入路径
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
};
```

### tailwindcss

- 安装所需的依赖

```
// 安装tailwindcss
yarn add tailwindcss@latest

// 安装postcss及插件
yarn add postcss@latest autoprefixer@latest -D
```

- 创建 postcss 配置文件 postcss.config.js，并写入一下内容

```
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

- 初始化 tailwindcss 配置

```
npx tailwindcss init
```

- 在 main.tsx 中引入 tailwindcss

```diff
+ import "tailwindcss/tailwind.css"
```

- 为生产而构建时，请确保配置清除 tailwind.config.js (purge) 选项以删除任何未使用类，这样生成的文件尺寸最小(当 NODE_ENV 设置为 production 时)

```diff
+ purge: ['./index.html', './src/**/*.tsx'],
```

### redux

- 安装所需依赖

```
yarn add @reduxjs/toolkit react-redux

yarn add redux-devtools -D
```
