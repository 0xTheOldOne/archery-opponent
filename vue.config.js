let assetsDir = "assets";

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/archery-opponent/" : "/",
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
      includeLocales: false,
      enableBridge: true,
    },
  },
  assetsDir: assetsDir,
  configureWebpack: (config) => {
    // if (process.env.NODE_ENV === "production") {
    //   config.output.filename = "js/[name].[contenthash:8].min.js";
    //   config.output.chunkFilename = "js/[name].[contenthash:8].min.js";
    // } else {
    config.output.filename = "js/[name].js";
    config.output.chunkFilename = "js/[name].js";
    // }
  },
  chainWebpack: (config) => {
    if (config.plugins.has("extract-css")) {
      const extractCSSPlugin = config.plugin("extract-css");
      extractCSSPlugin &&
        extractCSSPlugin.tap(() => [
          {
            filename: assetsDir + "/[name].css",
            chunkFilename: assetsDir + "/[name].css",
          },
        ]);
    }

    config.plugins.delete("html").delete("prefetch").delete("preload");
  },
};
