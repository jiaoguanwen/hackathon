<template>
  <div>
    <h2>数据统计</h2>
    <el-row>
      <el-col :span="8" class="charts-wrapper">
        <div id="stat1"></div>
      </el-col>
      <el-col :span="8" class="charts-wrapper">
        <div id="stat2"></div>
      </el-col>
      <el-col :span="8" class="charts-wrapper">
        <div class="stat3"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'

export default {
  name: 'statistics',
  mounted() {
    const pieChart = echarts.init(document.querySelector('#stat1'))
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
    const barChart = echarts.init(document.querySelector('#stat2'))
    console.log(barChart)
    barChart.setOption({
      title: {
        text: '堆叠区域图'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: { normal: {} },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
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