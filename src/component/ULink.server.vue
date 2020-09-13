<template>
  <router-link v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: "u-link"
}
</script>
