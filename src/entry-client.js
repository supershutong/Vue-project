import { createApp } from "./app"
import Vue from "vue"
const { app, router, store } = createApp()

// 当SSR数据渲染完成后，会在生成的HTML的script中添加一个window.__INITIAL_STATE__对象，可以将数据直接赋值给客户端渲染
if (window.__INITIAL_STATE__) {
  // 客户端激活：Vue在浏览器端接管由服务器端发送至浏览器端的html，并将其转化为由Vue管理的动态 Dom的过程。此处即Vuex的客户端激活
  store.replaceState(window.__INITIAL_STATE__)
}

Vue.mixin({
  // 此处用于处理路由传入到参数，如：localhost:3000/hot/:id 中的 id
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      })
        .then(() => next)
        .catch(next) // 此处把异常抛到下一层处理
    } else {
      next()
    }
  }
})

router.onReady(() => {
  app.$mount("#app")
})
