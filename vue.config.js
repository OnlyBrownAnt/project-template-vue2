const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: 'dist',
  assetsDir: 'static',
  css: {
    extract: process.env.NODE_ENV == 'production' 
  },
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    client: {
      // 关闭webpack-dev-server-client-overlay
      overlay: false
    },
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_URL_NG,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  configureWebpack() {
    return {
      resolve: {
        fallback: {
          http: require.resolve("stream-http"),
          https: require.resolve("https-browserify"),
          stream: require.resolve("stream-browserify"),
          url: require.resolve("url"),
          assert: require.resolve("assert/"),
          zlib: require.resolve("browserify-zlib")
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.optimization.minimizer('terser').tap((args) => {
      // terserOptions TODO 部署环境为生产环境时隐藏debugger、console.log
      args[0].terserOptions.compress.drop_debugger = process.env.VUE_APP_DEPLOY_ENV == 'production'; // 是否删除debugger
      // args[0].terserOptions.compress.drop_console = process.env.VUE_APP_DEPLOY_ENV == 'production'; // 是否删除console TODO 推荐只隐藏log级别的打印
      args[0].terserOptions.compress.pure_funcs = process.env.VUE_APP_DEPLOY_ENV == 'production' // 禁止的函数列表
          ? ['console.log'].concat(args[0].terserOptions.compress.pure_funcs == undefined ? [] : args[0].terserOptions.compress.pure_funcs) 
          : args[0].terserOptions.compress.pure_funcs == undefined ? [] : args[0].terserOptions.compress.pure_funcs;
      return args
    })
  }
})
