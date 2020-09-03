<template>
  <div :style="{ height: '100%' }">
    <!-- <u-infinite-scroll
      :items="items"
      :item-height="85"
      :except-height="102"
      #default="{ sliceItems }"
    >
      <u-list :items="sliceItems" />
    </u-infinite-scroll> -->
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
      items: state => state[state.activeType].items
    })
  },
  watch: {
    type(type) {
      this.fetchData({ type })
    }
  },
  created() {
    this.fetchNext()
  },
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
  height: 30px;
  /* background: #777; */
}
</style>
