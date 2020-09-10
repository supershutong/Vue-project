import { createApp } from "./app"
import { store } from "./module/topic/store"

const { app, router } = createApp()

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
