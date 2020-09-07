const fs = require("fs")
const path = require("path")
const express = require("express")
const setUpDevServer = require("./build/setup-dev-server")
const isProd = process.env.NODE_ENV === "production"

const HTML_FILE = path.join(__dirname, "./src/index.template.html")
const { createBundleRenderer } = require("vue-server-renderer")
const app = express()

const createRenderer = (bundle, options) =>
  createBundleRenderer(bundle, Object.assign(options, {}))

let renderer

const resolve = file => path.resolve(__dirname, file)
const serve = (path, cache) =>
  express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
  })

app.use("/dist", serve("./dist", true))
app.use("/public", serve("./public", true))
const serverReady = setUpDevServer(app, HTML_FILE, (bundle, options) => {
  renderer = createRenderer(bundle, options)
})

app.get("*", (req, res) => {
  serverReady.then(clientCompiler => {
    // clientCompiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
    //   if (err) {
    //     return next(err);
    //   }
    //   res.set("content-type", "text/html");
    //   res.send(result);
    //   res.end();
    // });
    renderer.renderToString({ url: req.url }, (err, html) => {
      if (err) {
        res.status(404).send("404 | Not Found")
      } else {
        res.send(html)
      }
    })
  })
})
let port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
