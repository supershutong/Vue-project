import Vue from "vue"
import App from "./App.vue"
import store from "./store"
import router from "./router"
import intersect from "./directive/intersect"

import { init as themeInit } from "./config/theme"
import { init as languageInit } from "./config/i18n"

Vue.directive("intersect", intersect)
themeInit()
languageInit()

const app = new Vue({
  store,
  router,
  render: h => h(App)
})

app.$mount("#app")
