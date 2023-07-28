const { defineConfig } = require("@vue/cli-service");
// unocss
const UnoCSS = require("@unocss/webpack").default;
// unplugin-auto-import
const AutoImport = require("unplugin-auto-import/webpack");
// unplugin-vue-components
const Components = require("unplugin-vue-components/webpack");
// elemnt-plus
const { VantResolver } = require("unplugin-vue-components/resolvers");
module.exports = defineConfig({
  publicPath: "./",
  transpileDependencies: true,
  productionSourceMap: false,
  devServer: {
    client: {
      overlay: false,
    },
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '诸暨教师精细化管理系统'
      return args
    })
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        imports: ["vue", "vue-router", "@vueuse/core", "pinia"],
        resolvers: [],
        dirs: ["./src/composables"],
        dts: "./auto-imports.d.ts",
      }),
      Components({
        resolvers: [VantResolver()],
      }),
      UnoCSS({}),
    ],
    optimization: {
      realContentHash: true,
    },
  },
});
