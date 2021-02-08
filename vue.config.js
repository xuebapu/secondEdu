const webpack = require("webpack");
console.log(process.env.TEST_URL);
console.log(process.env.BASE_URL);
module.exports = {
    // baseUrl: process.env.NODE_ENV === 'production' ? '/online/' : '/',
    // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
    // outputDir: 'dist',
    // pages:{ type:Object,Default:undfind }
    devServer: {
        port: 8081, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        proxy: {
          '/api': {
                target: 'http://192.168.1.82:30888', //设置调用接口域名和端口号别忘了加http
                changeOrigin: true,
                pathRewrite: {
                    '^/api': 'api'
                }
          },
          '/dev-api': {
            target: 'http://192.168.1.82:30888', //设置调用接口域名和端口号别忘了加http
            changeOrigin: true,
            pathRewrite: {
                '^/dev-api': 'api'
            }
      },
      '/admin': {
        target: 'http://192.168.1.82:30889', //设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
            '^/admin': 'admin'
        }
  },
        } ,
    },
}
