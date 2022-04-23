<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>
<style>
html,
body {
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100% !important;
  margin: 0px;
  padding: 0px;
  /* background: #2d3a4b; */
}

#nprogress .bar {
  /* background: rgb(96, 47, 231) !important; */
  /* background: rgb(159, 15, 202) !important; */
  background: rgb(1, 255, 179) !important;
}

.el-message {
  min-width: 245px !important;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
</style>
