<template>
  <div id="app">
    <el-menu mode="horizontal" :default-active="activeIndex" router>
      <el-menu-item index="/register">采集</el-menu-item>
      <el-menu-item index="/rules">规则</el-menu-item>
      <el-menu-item index="/statistics">统计</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {
      activeIndex: null
    }
  },
  created() {
    this.activeIndex = this.$route.path
  },
  methods: {
    handleSelect(key, keyPath) {
      alert(key, keyPath)
    }
  }
}
</script>

<style>
#app {
}
</style>
