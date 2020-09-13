<template>
  <a class="item" :href="node.originalUrl" :style="{borderColor:theme.primary}">
    <div class="title">{{ node.title }}</div>
    <div class="tags" v-if="hasTag">
      #
      <span class="tag" v-for="tag in node.tags" :key="tag.id">{{tag.title}}</span>
    </div>
  </a>
</template>

<script>
export default {
  inject: ["theme"], // provide/inject的数据无法响应式更新，适用于一次性初始化后不再更新的配置，响应式数据可以使用Vuex
  name: "u-item", // 缓存组件的name必须唯一，其将被作为cacheKey使用。
  serverCacheKey: (props) => props.node.id, // 纯静态组件建议返回常量，此时组件将始终被缓存。
  props: {
    node: {
      required: true
    }
  },
  computed: {
    hasTag() {
      return this.node.tags && this.node.tags.length > 0
    }
  }
}
</script>

<style scoped>
.item {
  display: block;
  background: #fff;
  color: #333;
  padding: 20px 0px 20px;
  border-bottom: 1px solid #eee;
  position: relative;
}
.title {
  font-size: 16px;
  margin-bottom: 5px;
}
.tags {
  font-size: 12px;
  color: #999;
}
.tag {
  margin-right: 3px;
}
</style>