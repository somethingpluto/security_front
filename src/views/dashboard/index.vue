<template>
  <div class="dashboard-container">
    <div class="header">
      <el-card class="left" shadow="hover">
        <div style="display: flex;align-items: center">
          <el-image style="width: 50px;height: 50px" :src="require('../../assets/images/panel.png')" />
          <h2>攻击事件预览</h2>
        </div>
        <panel-group />
      </el-card>
      <el-card class="right" shadow="hover">
        <div style="display: flex;justify-content: space-between;align-items: center">
          <h2>检测器更新</h2>
          <el-button type="primary">上传数据</el-button>
        </div>
        <div id="line-area" ref="lineArea" style="width: 100%;height: 200px" />
      </el-card>
    </div>
    <div class="body">
      <el-card style="flex: 1" shadow="hover">
        <div style="display: flex;justify-content: left;align-items: center">
          <el-image style="width: 40px;height: 40px" :src="require('../../assets/images/analyse.png')" />
          <h2 style="margin-left: 15px">攻击事件统计</h2>
          <div style="display: flex;justify-content: center;align-items: center;margin-left: 30px">
            <el-image style="width: 40px;height: 40px" :src="require('../../assets/images/warning.png')" />
            <h3 style="color: red;">最多攻击事件{{ maxAttackType }}</h3>
          </div>
        </div>
        <div class="item2">
          <div id="pie" ref="pie" />
        </div>
      </el-card>
      <el-card style="flex: 2;margin-left: 10px;margin-right: 10px" shadow="hover">
        <div style="display: flex;justify-content: left;align-items: center">
          <el-image style="width: 40px;height: 40px" :src="require('../../assets/images/statistics.png')" />
          <h2 style="margin-left: 15px">攻击事件分析</h2>
        </div>
        <div>
          <div class="item1">
            <div id="lineChart" ref="lineChart" />
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from 'echarts'
import PanelGroup from '@/views/dashboard/components/PanelGroup.vue'

export default {
  name: 'Dashboard',
  components: { PanelGroup },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.initLineGraph()
    this.initPieGraph()
    this.initLineAreaGraph()
  },
  data() {
    return {
      maxAttackType: 'DDos'
    }
  },
  methods: {
    getDate() {
      const date = new Date()
      const days = []
      for (let i = 0; i <= 24 * 6; i += 24) {		// 今天加上前6天
        const dateItem = new Date(date.getTime() - i * 60 * 60 * 1000)	// 使用当天时间戳减去以前的时间毫秒（小时*分*秒*毫秒）
        const y = dateItem.getFullYear()	// 获取年份
        let m = dateItem.getMonth() + 1	// 获取月份js月份从0开始，需要+1
        let d = dateItem.getDate()	// 获取日期
        m = this.addDate0(m)	// 给为单数的月份补零
        d = this.addDate0(d)	// 给为单数的日期补零
        const valueItem = y + '-' + m + '-' + d	// 组合
        days.push(valueItem)	// 添加至数组
      }

      return days
    },
    addDate0(time) {
      if (time.toString().length == 1) {
        time = '0' + time.toString()
      }
      return time
    },
    initLineGraph() {
      // 3. 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(this.$refs.lineChart)
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b0}({a0}): {c0}<br />{b1}({a1}): {c1}%'
        },
        legend: {
          data: ['攻击次数', '占比']
        },
        xAxis: {
          data: this.getDate()
        },
        yAxis: [{
          type: 'value',
          name: '销量',
          show: true,
          interval: 10,
          axisLine: {
            lineStyle: {
              color: '#5e859e',
              width: 2
            }
          }
        }, {
          type: 'value',
          name: '占比',
          min: 0,
          max: 100,
          interval: 10,
          axisLabel: {
            formatter: '{value} %'
          },
          axisLine: {
            lineStyle: {
              color: '#5e859e', // 纵坐标轴和字体颜色
              width: 2
            }
          }
        }],
        series: [{
          name: '销量',
          type: 'bar',
          barWidth: '50%',
          data: [5, 20, 36, 10, 10, 20, 60]
        }, {
          name: '占比',
          type: 'line',
          smooth: true,
          data: [15, 30, 46, 20, 20, 30, 62]
        }]
      }
      option && myChart.setOption(option)
    },
    initPieGraph() {
      const myChart2 = echarts.init(this.$refs.pie)
      const option2 = {

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
      myChart2.setOption(option2)
    },
    initLineAreaGraph() {
      const myChart3 = echarts.init(this.$refs.lineArea)
      const option3 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'attack',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          }
        ]
      }
      myChart3.setOption(option3)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container{
  height: 30%;
  width: 100%;
  .header{
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: left;
    align-items: center;
    margin-top: 10px;
    .left{
      flex: 3;
      margin: 10px;
      height: 100%;
    }
    .right{
      flex: 1;
      margin: 10px;
      height: 100%;
    }
  }
  .body{
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 15px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item1{
      width: 100%;
      height: 100%;
    }
    .item2{
      width: 100%;
      height: 100%;
    }
    #lineChart{
      height: 350px;
      width: 100%;
    }
    #pie{
      height: 350px;
      width: 100%;
    }
  }
}

</style>
