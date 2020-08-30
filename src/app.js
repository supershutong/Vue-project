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

/*
  1、吃饭 25*200=5000
  2、住宿 10*600=6000
  3、机票 2700
  4、高铁 2000
  5、租车 4--11 8*300=2400+ 异地费 2000
  6、油+高速 1800km 1000
  7、门票 4800
    西安： 华山 1000 华清池 700 大唐不夜城 500
    九寨沟：1000 若尔盖 500
    成都：熊猫+黄龙 600
    重庆：500
  8、预备 4000
  合计：29800
*/
