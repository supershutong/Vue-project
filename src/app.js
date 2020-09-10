import Vue from "vue"
import App from "./App.vue"
import { createStore } from "./store"
import { createRouter } from "./router"
import intersect from "./directive/intersect"

import { init as themeInit } from "./config/theme"
import { init as languageInit } from "./config/i18n"
import { init as permissionInit } from "./config/permission"

Vue.directive("intersect", intersect)

// app.$mount("#app")

export function createApp() {
  const store = createStore()
  const router = createRouter({ store })

  themeInit()
  languageInit()
  permissionInit()

  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })

  return {
    app,
    store,
    router
  }
}
