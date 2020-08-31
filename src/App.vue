<template>
  <div>
    <div class="m-top" :style="{ backgroundColor: theme.primary }">
      <router-link
        class="m-link"
        :style="{
          backgroundColor:
            $route.name === nav.path ? theme.highlight : theme.primary
        }"
        v-for="nav in navs"
        :key="nav.path"
        :to="nav.path"
        >{{ nav.name }}</router-link
      >
    </div>
    <div class="m-content">
      <router-view />
    </div>

    <div class="m-side">
      <div>
        主题切换：
        <button @click="themeType = 'red'">红</button>
        <button @click="themeType = 'blue'">蓝</button>
      </div>
      <div>
        语言切换：
        <button @click="language = 'chinese'">中文</button>
        <button @click="language = 'en'">English</button>
      </div>
    </div>
  </div>
</template>

<script>
import { LIST_TYPE } from "./module/topic/store"
import config from "./config/config"

export default {
  data() {
    return {
      themeType: "blue",
      language: "chinese"
    }
  },
  provide() {
    return {
      theme: this.theme
    }
  },
  computed: {
    theme() {
      return config.get("theme")[this.themeType]
    },
    navNames() {
      return config.get("language").navs[this.language]
    },
    navs() {
      return [
        {
          name: this.navNames[LIST_TYPE.HOT],
          path: LIST_TYPE.HOT
        },
        {
          name: this.navNames[LIST_TYPE.NEW],
          path: LIST_TYPE.NEW
        },
        {
          name: this.navNames[LIST_TYPE.TOP],
          path: LIST_TYPE.TOP
        },
        {
          name: this.navNames.about,
          path: "/about"
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
  width: 360px;
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

.m-side {
  position: fixed;
  left: 0;
  margin-left: 20px;
  top: 100px;
}
</style>
