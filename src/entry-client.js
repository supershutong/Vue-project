import { createApp } from "./app"
import { store } from "./module/topic/store"

const { app, router } = createApp()

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

router.onReady(() => {
  app.$mount("#app", true)
})
