import { createApp } from "./app"
import Vue from "vue"
const { app, router, store } = createApp()

// 当SSR数据渲染完成后，会在生成的HTML的script中添加一个window.__INITIAL_STATE__对象，可以将数据直接赋值给客户端渲染
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      })
        .then(() => next)
        .catch(err)
    } else {
      next()
    }
  }
})

// 客户端激活：Vue在浏览器端接管由服务器端发送至浏览器端的html，并将其转化为由Vue管理的动态 Dom的过程
router.onReady(() => {
  app.$mount("#app")
})
