<template>
  <div :style="{ padding: padding }">
    <slot :sliceItems="sliceItems" />
  </div>
</template>

<script>
import { throttle } from "../util/throttle"

export default {
  props: {
    items: {
      required: true
    },
    itemHeight: {
      require: true
    },
    exceptHeight: {
      default: 0
    }
  },
  data() {
    return {
      buffer: 3,
      scrollTop: 0,
      viewportHeight: 0
    }
  },
  computed: {
    over() {
      return Math.max(this.scrollTop / this.itemHeight - this.buffer, 0) | 0
    },
    down() {
      return (
        Math.min(
          (this.scrollTop + this.viewportHeight) / this.itemHeight +
            this.buffer,
          this.items.length
        ) | 0
      )
    },
    sliceItems() {
      return this.items.slice(this.over, this.down)
    },
    padding() {
      return `${this.over * this.itemHeight}px 0 ${
        (this.items.length - this.down) * this.itemHeight
      }px 0`
    }
  },
  created() {
    this.scrollTop = window.scrollY // 此处获取已滚动高度错误，应为document.body.scrollTop
    this.viewportHeight = window.innerHeight - this.exceptHeight
    document.addEventListener("scroll", this.onScroll, { passive: true })
  },
  destroyed() {
    document.removeEventListener("scroll", this.onScroll)
  },
  methods: {
    onScroll: throttle(function () {
      this.scrollTop = window.scrollY
      this.viewportHeight = window.innerHeight - this.exceptHeight
    })
  }
}
</script>
