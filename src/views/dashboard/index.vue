<template>
  <div class="dashboard-container">
    <div class="header">
      <el-card class="left">
        <h2>攻击事件预览</h2>
        <panel-group />
      </el-card>
      <el-card class="right">
        <div style="display: flex;justify-content: space-between;align-items: center">
          <h2>检测器更新</h2>
          <el-button type="primary">上传数据</el-button>
        </div>
        <div id="line-area" ref="lineArea" style="width: 100%;height: 200px" />
      </el-card>
    </div>
    <div class="body">
      <el-card style="margin-left: 10px;margin-right: 10px;margin-top: 5px" shadow="hover">
        <h2>攻击事件统计</h2>
        <div class="top-pannel-bar">
          <div class="item1">
            <div id="lineChart" ref="lineChart" />
          </div>
          <div class="item2">
            <div id="pie" ref="pie" />
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
  methods: {
    initLineGraph() {
      // 3. 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(this.$refs.lineChart)
      const option = {
        title: {
          text: '恶意代码分布',
          left: 'center'
        },
        tooltip: {},
        dataset: [{
          dimensions: ['name', 'score'],
          source: [
            ['Ramnit', 1541],
            ['Lollipop', 2478],
            ['Kelihos_ver3', 2942],
            ['Vundo', 475],
            ['Simda', 42],
            ['Tracur', 751],
            ['Kelihos_ver1', 398],
            ['Obfuscator.ACY', 1228],
            ['Gatak', 1013],
            ['正样本', 2000]
          ]
        }, {
          transform: {
            type: 'sort',
            config: { dimension: 'score', order: 'desc' }
          }
        }],
        xAxis: {
          type: 'category',
          axisLabel: { interval: 0, rotate: 30 }
        },
        yAxis: {},
        series: {
          type: 'bar',
          barWidth: '50%',
          encode: { x: 'name', y: 'score' },
          datasetIndex: 1,
          itemStyle: {
            normal: {
              color: function(params) {
                var colorList = ['#58A3F7', '#58A3F7', '#38B842', '#58A3F7', '#58A3F7', '#58A3F7', '#58A3F7', '#58A3F7', '#58A3F7', '#58A3F7']
                return colorList[params.dataIndex]
              }
            }
          }
        }
        // color: ["#58A3F7"]
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
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      }
      myChart2.setOption(option2)
    },
    initLineAreaGraph() {
      var myChart3 = echarts.init(this.$refs.lineArea)
      var option3 = {
        title: {
          text: ''
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
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
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
            name: 'Email',
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
    width: 100%;
    height: 70%;
    .top-pannel-bar{
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .item1{
        flex: 2;
      }
      .item2{
        flex: 1;
      }
    }
    #lineChart{
      height: 300px;
      width: 100%;
    }
    #pie{
      height: 300px;
      width: 100%;
    }
  }
}

</style>
