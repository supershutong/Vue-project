<script>
import { remove, getFirstComponentChild } from "../util/vue"

function pruneCacheEntry(cache, key, keys, current) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}

export default {
  name: "u-keep-alive",
  abstract: true,
  props: {
    max: [Number, String]
  },
  created() {
    this.cache = Object.create(null) // 相比字面量赋值{}好处在于：该变量没有Object原型的方法，性能更好
    this.keys = []
  },
  render() {
    const slot = this.$slots.default
    const vnode = getFirstComponentChild(slot)
    const componentOptions = vnode && vnode.componentOptions

    if (componentOptions) {
      const { cache, keys } = this
      const key =
        vnode.key ||
        `${componentOptions.Ctor.cid}::${componentOptions.tag || ""}`
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance // 核心：vue底层判断VNode节点是否有componentInstance属性并渲染
        remove(keys, key)
        keys.push(key)
      } else {
        cache[key] = vnode
        keys.push(key)

        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }
      vnode.data.keepAlive = true
    }

    return vnode
  }
}
</script>
