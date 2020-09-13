import Vue from "vue"
import VueRouter from "vue-router"
import { routes as topic } from "./module/topic/router"
import { PERMISSION_MAP, getPermissionByRole } from "./config/permission"
// import store from "./store"
import { compose } from "./util/compose"

Vue.use(VueRouter)

export function createRouter({ store }) {
  const getRole = () => store.state.user.role
  const getPermission = permission =>
    compose(obj => obj[permission], getPermissionByRole, getRole)()

  return new VueRouter({
    mode: "history",
    routes: [
      ...topic,
      {
        name: "about",
        path: "/about",
        component: () =>
          import(/* webpackChunkName:"about" */ "./views/UAbout.vue"),
        beforeEnter(to, from, next) {
          getPermission(PERMISSION_MAP.ABOUT_PAGE) ? next() : next("403")
        }
      },
      {
        name: "403",
        path: "/403",
        component: () => import(/* webpackChunkName:"403" */ "./views/403.vue")
      },
      {
        path: "/",
        redirect: "/hot"
      }
    ]
  })
}
