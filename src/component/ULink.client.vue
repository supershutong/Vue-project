<template>
  <router-link v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </router-link>
</template>

<script>
const requestIdleCallback =
  window.requestIdleCallback ||
  function (cb) {
    const start = Date.now()
    return setTimeout(() => {
      cb({
        didTimeout: false,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
      })
    }, 0)
  }

const cancelIdleCallback =
  window.cancelIdleCallback ||
  function (id) {
    clearTimeout(id)
  }

// observe观察函数: 观察页面上出现的路由link
const observe =
  window.IntersectionObserver &&
  new window.IntersectionObserver((entries) => {
    entries.forEach(({ intersectionRatio, target }) => {
      if (intersectionRatio <= 0) return
      // to do prefetch
      target.__prefetch()
    })
  })

export default {
  name: "u-link",
  props: {
    prefetch: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.prefetch) {
      this.handleId = requestIdleCallback(this.observe, {
        timeout: 2e3
      })
    }
  },
  beforeDestroy() {
    cancelIdleCallback(this.handleId)
  },
  methods: {
    observe() {
      if (!observe) return
      // 1、是否支持 prefetch
      if (this.shouldPrefetch()) {
        this.$el.__prefetch = this.prefetchLink.bind(this)
        observe.observe(this.$el)
        this.__observed = true
      }
    },

    shouldPrefetch() {
      return this.getPrefetchComponents().length > 0
    },

    getPrefetchComponents() {
      const ref = this.$router.resolve(this.$attrs.to, this.$route)
      // console.log(ref)
      const Components = ref.resolved.matched.map((r) => r.components.default)
      return Components.filter(
        (Component) =>
          typeof Component === "function" &&
          !Component.options &&
          !Component.__prefetched
      )
    },

    prefetchLink() {
      observe.unobserve(this.$el)
      const Components = this.getPrefetchComponents()
      for (const Component of Components) {
        Component()
        Component.__prefetched = true
      }
    }
  }
}
</script>
