// const webpack = require("webpack");
// const SpriteLoaderPlugin = require("svg-sprite-loader/plugin")
// const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const webpack = require("webpack")
const PACKAGE = require("./package.json")
const version = PACKAGE.version

const banner = `/*!
* ------------------------------------------------------------
*  Smile Vue v${version}
*  (c) Alegra 2020 - present
* ------------------------------------------------------------
*/`

module.exports = {
  // Inject base-tokens to every component
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import '@alegradev/smile-ui-css/src/_base-tokens.scss';`
      }
    }
  },
  configureWebpack: {
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: /Alegra/i
            }
          },
          extractComments: false
        })
      ]
    },
    plugins: [
      new webpack.BannerPlugin({
        banner,
        raw: true
      })
    ]
    // plugins: [new SpriteLoaderPlugin()]
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg")

    // clear all existing loaders.
    // if you don't do this, the loader below will be appended to
    // existing loaders of the rule.
    svgRule.uses.clear()

    // add replacement loader(s)
    // Temporay fix: this increse the bundle size
    svgRule
      .use("url-loader")
      .loader("url-loader")
      .tap(options => {
        options = options || {}
        options.limit = true
        return options
      })

    config.plugin("optimize-css-assets").use(OptimizeCSSAssetsPlugin, [
      {
        cssProcessorPluginOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true }
            }
          ]
        }
      }
    ])

    // Not working:
    // inspired in: https://stackoverflow.com/a/47217959/965452
    // svgRule
    //   .use("file-loader")
    //   .loader("file-loader?mimetype=image/svg+xml&name=./[name].[ext]")
  }
}
