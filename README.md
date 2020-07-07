# 使用verdaccio 搭建私有npm 服务器
* npm install verdaccio -g
* verdaccio 启动 
* nrm ls 查看所有源 (需要npm install nrm -g)
* 本地添加一个源 nrm add registryName http://localhost:4873
* 将当前 npm 服务指向私库 nrm use registryName 
* 注册用户 （npm adduser –registry http://localhost:4873，按照提示输入userName 和 password,email）
* npm publish 发布包到私库

# react-rollup

## 开发react插件
* 进入package.json文件，全局替换 my-react-plugin 成你的包名。
* npm install 安装依赖
* npm run dev 启动项目
* 在components 文件中复制demo 文件进行开发 

## 打包插件

* dist 输出文件

- my-react-plugin.esm.js
- my-react-plugin.cjs.js
- my-react-plugin.min.js
- my-react-plugin.umd.js
- my-react-plugin.min.css

## 发布插件  
* npm publish  （到http://localhost:4873就可以看见发布成功）
* 文件列表

- dist
- src
- package.json

## 引用插件
* 在项目下 新增 .npmrc 文件 ，添加 registry=http://localhost:4873
* npm install @i61/my-react-plugin
* import MyPlugin from "@i61/my-react-plugin"
* import  "@i61/my-react-plugin/dist/my-plugins.min.css"
