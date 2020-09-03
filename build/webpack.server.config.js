const webpack = require("webpack")
const merge = require("webpack-merge")
const base = require("./webpack.base.config")
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin")
const nodeExternals = require("webpack-node-externals")

const config = merge(base, {
  entry: {
    app: "./src/entry-server.js"
  },
  resolve: {
    alias: {}
  },
  target: "node",
  output: {
    filename: "server-bundle.js",
    libraryTarget: "commonjs2"
  },
  externals: nodeExternals({}),
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      "process.env.VUE_ENV": '"server"'
    }),
    new VueSSRServerPlugin()
  ]
})

module.exports = config
