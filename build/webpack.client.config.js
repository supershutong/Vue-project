const webpack = require("webpack")
const merge = require("webpack-merge")
const base = require("./webpack.base.config")
const path = require("path")
const PrerenderSPAPlugin = require("prerender-spa-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin")

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

/**
 * 静态资源，如帮助页面等，建议使用prerender把生成的文件放在cdn/web服务器，
 * 然后在nginx配置用户访问指定的静态资源时直接重定向到cdn/web资源服务器
 *
 * 原理： client webpack => html js css
 * PrerenderSPAPlugin headless chrome puperteer
 *
 * 注意：1、此时如果渲染结果没有预渲染的html内容，则很有可能是publicPath路径不对，改为相对路径 ./
 * 2、生产环境才做prerender预渲染
 */
if (process.env.NODE_ENV === "production") {
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: "src/prerender.template.html" // prerender页面要重写入口模版
    }),
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, "../dist"),
      routes: ["/about"]
    })
  )
}

module.exports = config
