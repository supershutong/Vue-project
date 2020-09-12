<template>
  <div :style="{ height: '100%' }">
    <!-- <u-infinite-scroll
      :items="items"
      :item-height="85"
      :except-height="102"
      #default="{ sliceItems }"
    >
      <u-list :items="sliceItems" />
    </u-infinite-scroll>-->
    <u-list :items="items" />

    <div class="x-bottom" v-intersect="{ handler: fetchNext }"></div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
import UList from "../components/UList.vue"
// import UInfiniteScroll from "../../../component/UInfiniteList.vue"

const { mapState, mapActions } = createNamespacedHelpers("topic")

export default {
  name: "u-top",
  props: ["type"],
  components: {
    UList
    // UInfiniteScroll
  },
  computed: {
    ...mapState({
      items: (state) => state[state.activeType].items
    })
  },
  watch: {
    type(type) {
      this.fetchData({ type })
    }
  },
  // 首屏的第一个路由组件添加asyncData方法来请求数据，注意是组件的静态方法，而非在methods中定义的方法。
  // 因为只有静态方法可以被服务端在编译时解析出来 { asyncData }
  asyncData({ store, route }) {
    return store
      .dispatch("topic/FETCH_LIST_DATA", { type: route.name })
      .catch((e) => console.error(e))
  },
  // created() {
  //   this.fetchNext()
  // },
  methods: {
    ...mapActions({
      fetchData: "FETCH_LIST_DATA"
    }),
    fetchNext() {
      const { type } = this
      this.fetchData({ type })
    }
  }
}
</script>

<style scoped>
.x-bottom {
  width: 100%;
  height: 1px;
}
</style>