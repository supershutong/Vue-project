<template>
  <div>
    <div class="m-top">
      <router-link class="m-link" v-for="nav in navs" :key="nav.path" :to="nav.path">{{nav.name}}</router-link>
    </div>
    <div class="m-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { LIST_TYPE } from "./module/topic/store"

export default {
  computed: {
    navs() {
      return [
        {
          name: "热门",
          path: LIST_TYPE.HOT
        },
        {
          name: "最新",
          path: LIST_TYPE.NEW
        },
        {
          name: "热榜",
          path: LIST_TYPE.TOP
        }
      ]
    }
  }
}
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  margin: 0;
  overflow-y: scroll;
}

a {
  text-decoration: none;
  color: #007fff;
}

.m-top {
  height: 60px;
  width: 100%;
  background: #007fff;
}

.m-content {
  width: 960px;
  border: 1px solid #eee;
  background: #fff;
  margin: 20px auto;
  padding: 0 20px;
}

.m-link {
  display: inline-block;
  color: #fff;
  height: 60px;
  line-height: 60px;
  font-size: 20px;
  padding: 0 20px;
}

.router-link-active {
  background-color: #00a6ff;
}
</style>
