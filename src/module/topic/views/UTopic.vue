<template>
  <div>
    <u-list :items="items" />
    <div class="x-bottom" v-intersect="{ handler: fetchNext }"></div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import UList from "../components/UList.vue";

const { mapState, mapActions } = createNamespacedHelpers("topic");

export default {
  name: "u-top",
  props: ["type"],
  components: {
    UList
  },
  computed: {
    ...mapState({
      items: (state) => state[state.activeType].items
    })
  },
  created() {
    this.fetchNext();
  },
  methods: {
    ...mapActions({
      fetchData: "FETCH_LIST_DATA"
    }),
    fetchNext() {
      const { type } = this;
      this.fetchData({ type });
    }
  }
};
</script>

<style scoped>
.x-bottom {
  width: 100%;
  height: 30px;
  background: #777;
}
</style>
