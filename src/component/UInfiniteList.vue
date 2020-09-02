<template>
  <div :style="{ padding: padding }">
    <slot :sliceItems="sliceItems" />
  </div>
</template>

<script>
import throttle from '../util/throttle'

export default {
  props: {
    items: {
      required: true
    },
    itemHeight: {
      require: true
    }
  },
  data() {
    return {
      buffer: 5,
      scrollTop: 0,
      viewportHeight: 0
    }
  },
  computed: {
    over() {
      return Math.max(this.scrollTop / this.itemHeight - this.buffer, 0)
    },
    down() {
      return Math.min(
        (this.scrollTop + this.viewportHeight) / this.itemHeight + this.buffer,
        this.items.length
      )
    },
    sliceItems() {
      return this.items.slice(this.over, this.down)
    },
    padding() {
      return `${this.over * this.itemHeight}px 0 ${(this.itemHeight.length -
        this.down) *
        this.itemHeight}px 0`
    }
  },
  created(){
    document.addEventListener('scroll',this.onScroll,{passive:true})
  },
  destroyed(){
    document.removeEventListener('scroll',this.onScroll)
  },
  methods:{
    onScroll(){
    this.scrollTop = document.body.scrollTop
    this.viewportHeight = window.innerHeight
    }
  }
}
</script>
