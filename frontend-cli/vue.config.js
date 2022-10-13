const { defineConfig } = require('@vue/cli-service')

const target = process.env.VUE_APP_BASE_URL;

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: "/",
  devServer: {
    // 백엔드 서버가 8080을 쓰기로 했으므로 충돌이 나지 않게 프론트는 8081포트로 고정되어서 실행됩니다
    port: process.env.VUE_APP_PORT,
    open: process.platform === 'darwin',
    proxy: {
      '/api': {
        target,
        changeOrigin: true
      }
      // '/api': process.env.VUE_APP_BASE_URL,
    }
  }
})
