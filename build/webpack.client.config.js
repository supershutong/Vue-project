const webpack = require("webpack")
const merge = require("webpack-merge")
const base = require("./webpack.base.config")
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const PrerenderSPAPlugin = require("prerender-spa-plugin")
const path = require("path")

const config = merge(base, {
  entry: {
    app: "./src/entry-client.js"
  },
  resolve: {
    alias: {}
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      "process.env.VUE_ENV": '"client"'
    }),
    new VueSSRClientPlugin()
  ]
})

// // 静态资源，如帮助页面等，建议使用prerender放在cdn服务器
// if (process.env.NODE_ENV === "production") {
//   config.plugins.push(
//     new HtmlWebpackPlugin({
//       template: "src/prerender.template.html"
//     }),
//     new PrerenderSPAPlugin({
//       staticDir: path.join(__dirname, "../dist"),
//       routes: ["/about"]
//     })
//   )
// }

module.exports = config
