<template>
  <ul class="custom-ul">
    <li class="custom-li">
      <el-radio v-model="radio" label="1">
        浏览次数，
        <el-select v-model="inDays" class="mr-5">
          <el-option :value="3">3</el-option>
          <el-option :value="5">5</el-option>
          <el-option :value="7">7</el-option>
        </el-select>天内浏览品牌、品类次数超过
        <el-input-number v-model="browseCount" :controls="false" class="mr-5" />次
      </el-radio>
    </li>
    <li class="custom-li">
      <el-radio v-model="radio" label="2">品牌偏好</el-radio>
    </li>
    <li class="custom-li">
      <el-radio v-model="radio" label="3">品类偏好</el-radio>
    </li>
    <li class="custom-li">
      <el-radio v-model="radio" label="4">智能推荐</el-radio>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'rules',
  data() {
    return {
      radio: '1',
      browseCount: 3,
      inDays: 3
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-ul {
  list-style: none;
  .custom-li {
    line-height: 40px;
  }
}
.mr-5 {
  margin-right: 5px;
}
</style>