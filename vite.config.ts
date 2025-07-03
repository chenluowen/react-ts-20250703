import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path"  //解决不报红  npm i -D @types/node

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
    /* 作用：配置 SCSS 预处理器。
      说明：
      javascriptEnabled: true：允许在 SCSS 中使用 JavaScript 表达式（某些 SCSS 工具可能需要此选项）。
      additionalData：在每个 SCSS 文件开头自动插入指定内容。
        此处会自动导入 scssConfig.scss 文件，通常用于定义全局变量、混合（mixins）等。
    */
    css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `@import "./src/styles/scssConfig.scss";`,
      },
    },
    // postcss: {
    //   plugins: [
    //     postcss({
    //       plugins: [
    //         pxToViewport({
    //           viewportWidth: 1920, // 视口宽度
    //           viewportHeight: 1080, // 视口高度
    //           unitPrecision: 5, // 转换后的单位精度
    //           viewportUnit: "vw", // 转换的目标单位
    //           selectorBlackList: [
    //             "box",
    //             "styles-box",
    //             "homebox",
    //             "styles-homebox",
    //             "organization-manage",
    //             "applyBox",
    //             "applyConcent",
    //             "styles-card",
    //             "queryModal",
    //             "ant-",
    //             "antd-",
    //           ], // 需要忽略的 CSS 选择器
    //           minPixelValue: 1, // 最小的转换数值
    //           mediaQuery: false, // 是否转换媒体查询中的值
    //           exclude: [/styles-card/, /applyConcent/],
    //           include: [/account\.module\.scss$/],
    //         }),
    //       ],
    //     }),
    //   ],
    // },
  },
  server: {
    port: 80,
    host: true,
    open: true,
    proxy: {
      /* 登录 */
      "/admin": {
        target: "http://192.168.40.22:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/admin/, ""),
      },
      /* AI分析 */
      "/ai": {
        target: "http://192.168.40.83:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ai/, ""),
      },
      "/minum": {
          target: "http://saas3-test.minum.cloud/minum",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/minum/, ""),
        },
      '/demo': {
        target: 'https://dev.usemock.com/6835881ac36979409424b865',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/demo/, ""),
      }
    },
  },
})
