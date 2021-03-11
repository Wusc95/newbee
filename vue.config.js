const path = require("path");
const vConsolePlugin = require("vconsole-webpack-plugin")
const resolve = dir => path.join(__dirname, dir);
module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@base", resolve("baseConfig"))
      .set("@public", resolve("public"));
  },
  configureWebpack: config => {
    let plugins = [];

      plugins.push(
        new vConsolePlugin({
          filter: [], // 需要过滤的入口文件
          enable: true // 发布代码前记得改回 false
        })
      );
    config.plugins = [...config.plugins, ...plugins];
  }
};