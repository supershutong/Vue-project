const fs = require("fs")
const path = require("path")
const express = require("express")
const LRU = require("lru-cache")
const setUpDevServer = require("./build/setup-dev-server")
const isProd = process.env.NODE_ENV === "production"

const HTML_FILE = path.join(__dirname, "./src/index.template.html")
const { createBundleRenderer } = require("vue-server-renderer")
const app = express()

/** LRU缓存应用场景：
 * 1、底层的内存管理，页面置换算法
 * 2、一般的缓存服务，memcache\redis之类
 * 主要用于解决性能瓶颈
 */
// 页面级别缓存实例
const microCache = new LRU({
  max: 100,
  maxAge: 1000 * 60 // 缓存时间60s,适用于高并发场景
})

const createRenderer = (bundle, options) =>
  createBundleRenderer(
    bundle,
    Object.assign(options, {
      // cache: LRU({
      //   max: 100,
      //   maxAge: 1000 * 60
      // })

      // 可基于文件扩展名进行类型推断。参见 * SSR文档 *
      shouldPrefetch: (file, type) => false // 默认不启用prefetch，需要的地方用户在页面自行配置prefetch
    })
  )

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
    const s = Date.now()

    // clientCompiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
    //   if (err) {
    //     return next(err);
    //   }
    //   res.set("content-type", "text/html");
    //   res.send(result);
    //   res.end();
    // });

    // 缓存：命中缓存则直接返回html，不再请求数据
    const hit = microCache.get(req.url)
    if (hit) {
      !isProd && console.log(`whole req in ${Date.now() - s}ms`)
      return res.end(hit)
    }

    // renderer.renderToString({ url: req.url }, (err, html) => {
    //   if (err) {
    //     res.status(404).send("404 | Not Found")
    //   } else {
    //     // 添加页面级别缓存
    //     microCache.set(req.url, html)
    //     res.send(html)
    //     !isProd && console.log(`whole req in ${Date.now() - s}ms`)
    //   }
    // })

    // stream 流式渲染 + 缓存
    const stream = renderer.renderToStream({ url: req.url })
    let html = ""

    stream.on("data", chunk => {
      html += chunk.toString()
      res.write(chunk.toString())
    })

    stream.on("end", () => {
      // 添加缓存
      microCache.set(req.url, html)
      res.end()
      !isProd && console.log(`whole req in ${Date.now() - s}ms`)
    })

    stream.on("error", err => {
      if (err) {
        res.status(404).send("404 | Not Found")
      }
    })
  })
})
let port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
