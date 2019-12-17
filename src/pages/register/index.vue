<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <h2>信息录入</h2>
      <el-form :model="form" @submit.native.prevent label-position="top">
        <el-form-item label="京东用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="16">
      <h2>图像采集</h2>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      form: {
        name: ''
      }
    }
  },
  methods: {
    onSubmit() {
      // do submit thing
    }
  }
}
</script>

<style lang="scss" scoped>
</style>