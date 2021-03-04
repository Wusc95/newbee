const path = require("path");
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
};