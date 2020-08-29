import Vue from "vue"
import App from "./App.vue"
import store from "./store"
import router from "./router"

import intersect from "./directive/intersect"

Vue.directive("intersect", intersect)

const app = new Vue({
  store,
  router,
  render: h => h(App)
})

app.$mount("#app")
