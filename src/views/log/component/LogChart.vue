<template>
  <div class="box">
    <div>
      <div style="display: flex;align-items: center;justify-content: left;width: 100%;">
        <el-image style="width: 40px;height: 40px;margin-right: 10px" :src="require('../../../assets/images/statistics.png')" />
        <h2>当前页面数据统计</h2>
      </div>
    </div>
    <div class="item1">
      <div id="currentPagePie" ref="currentPagePie" />
    </div>
    <div class="item2">
      <div style="display: flex;justify-content: left;align-items: center">
        <el-image style="width: 40px;height: 40px;margin-right: 10px" :src="require('../../../assets/images/time.png')" />
        <h2>攻击时间段分布</h2>
      </div>
      <div>
        <span>00:00 - 03:00</span>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="10" status="success" />
      </div>
      <div>
        <span>03:00 - 06:00</span>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="11" status="success" />
      </div>
      <div>
        <span>06:00 - 09:00</span>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="24" status="warning" />
      </div>
      <div>
        <span>09:00 - 12:00</span>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="33" status="exception" />
      </div>
      <div>
        <span>12:00 - 15:00</span>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="10" status="success" />
      </div>
      <div>
        <span>15:00 - 18:00</span>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="6" status="success" />
      </div>
      <div>
        <span>18:00 - 21:00</span>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="8" status="success" />
      </div>
      <div>
        <span>21:00 - 00:00</span>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="9" status="success" />
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'LogChart',
  data() {
    return {

    }
  },
  mounted() {
    this.initPieGraph()
  },
  methods: {
    initPieGraph() {
      const myChart = echarts.init(this.$refs.currentPagePie)
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: [
              { value: '29.03', name: 'Dos' },
              { value: '23.68', name: 'DDos' },
              { value: '14.86', name: 'SSH-Brute' },
              { value: '21.07', name: 'Bot' },
              { value: '11.36', name: 'Unknown' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="scss">
.box{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.item1{
  width: 100%;
  height: 300px;
}
.item2{
  width: 100%;
  height: 400px
}
#currentPagePie{
  width: 100%;
  height: 100%;
}
</style>

