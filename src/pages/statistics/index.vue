<template>
  <div>
    <h2>数据统计</h2>
    <el-row>
      <el-col :span="8" class="charts-wrapper">
        <div id="stat"></div>
      </el-col>
      <el-col :span="8" class="charts-wrapper">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="8" class="charts-wrapper">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'

export default {
  name: 'statistics',
  mounted() {
    const pieChart = echarts.init(document.querySelector('#stat'))
    console.log(pieChart)
    pieChart.setOption({
      title: {
        text: '触动率'
      },
      series: [
        {
          name: '销量',
          type: 'pie',
          data: [
            { value: 90, name: '成功触达数量' },
            { value: 10, name: '未成功触达' }
          ]
        }
      ]
    })
  }
}
</script>

<style lang="scss" scoped>
.charts-wrapper {
  height: 400px;
  > div {
    height: 100%;
  }
}
</style>