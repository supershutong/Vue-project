<template>
  <div>
    <div class="m-top"></div>
    <div class="m-content">
      <u-topic type="hot"></u-topic>
    </div>
  </div>
</template>

<script>
import UTopic from "./module/topic/views/UTopic.vue";

export default {
  components: {
    UTopic
  }
};
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
  width: 960px;
  border: 1px solid #eee;
  background: #fff;
  margin: 20px auto;
  padding: 0 20px;
}
</style>
