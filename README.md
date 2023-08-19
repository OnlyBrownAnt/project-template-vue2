# project-template-vue2
工程模版(vue2)，侧重于业务性的内容开发。对公共性的配置和要求比较多。

## 已配置模块
- vue-router
- vuex
- axios
- vue-wechat-title
- babel/preset-env

## 预封装内容
- 公共CSS样式初始化
- KeepAlive使用规则
- 环境配置文件(.env.*)使用规则
- Navbar组件
- Request公共的请求处理和使用规则
- AES加解密函数
- RSA加解密插件
- 配置editorconfig规则

### 工程结构
```text 
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 本地静态资源
│   ├── components             // 业务通用组件
│   ├── directive              // 全局指令
│   ├── filters                // 全局 filter
│   ├── icons                  // 项目所有 svg icons
│   ├── lang                   // 国际化 language
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 工具库
│   ├── views                  // 业务组件
│   └── main.js                // 入口 加载组件 初始化等
├── public                     // 
│   ├── index.html             // html模板
│   ├── favicon.ico            // favicon图标
│   └── static                 // 第三方不打包资源
├── .eslintrc.js               // eslint 配置项
├── .gitignore                 // git 忽略项
├── .env.development           // 模式配置文件(development)
├── .env.production            // 模式配置文件(production)(行内-prod环境)
├── .env.test                  // 模式配置文件(test)
├── .env.staging               // 模式配置文件(行内-dev环境)
├── .env.uat                   // 模式配置文件(行内-uat环境)
└── package.json               // package.json
└── vue.config.js              // 配置文件
```
## 开发约定
1. 不允许本地开发工具和开发工具版本不一致的情况下上传更新package-lock.json
2. package-lock.json需要上传git便于打包工具打包，以及作为开发下载包的依据

## 开发环境
### 开发工具版本
```shell
node: 16.19.0
npm: 8.19.3
```

## 环境配置文件说明
不同的部署环境都有对应的环境配置文件。 比如部署环境prod的环境配置文件是.env.production。
```shell
NODE_ENV=production // 模式
VUE_APP_DEPLOY_ENV=production // 自定义-部署环境
VUE_APP_BASE_URL=/api // 自定义-服务地址
VUE_APP_BASE_URL_NG= // 自定义-调试地址
VUE_APP_BASE_URL_MOCK= // 自定义-mock调试地址
VUE_APP_PUBLIC_PATH=/ // 发布地址
VUE_APP_OPEN_ENCRYPT=false // 是否启用报文加解密
VUE_APP_OPEN_VCONSOLE=false // 是否启用VConsole插件
```
### 环境和使用配置文件目录
```
单元测试: .env.test
dev: .env.development
staging: .env.staging
production: .env.production 
```

## 调试命令
通过修改配置文件中的VUE_APP_BASE_URL_NG属性来指定正向代理地址
```shell
# dev环境
npm run serve
```

## 打包命令
```shell
# staging环境
npm run build:staging

# prod环境
npm run build
```

## 打包配置说明
### 浏览器兼容配置
```json
  "browserslist": [
    "> 1%",
    "last 2 versions"
  ]
```
