<template>
  <div class="dashboard-container">
    <el-card style="margin-left: 10px;margin-right: 10px;margin-top: 5px" shadow="hover">
      <div class="top-pannel-bar">
        <div class="item1">
          <div id="lineChart" />
        </div>
        <div class="item2">
          <div id="pie" />
        </div>
      </div>
    </el-card>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from 'echarts'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  async mounted() {
    // 3. 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('lineChart'))
    var option = {
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

    var myChart2 = echarts.init(document.getElementById('pie'))
    var option2 = {
      title: {
        text: '样本数据集比率饼图(%)',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: '占比',
          type: 'pie',
          radius: '60%',
          data: [
            { value: 80.12, name: '测试集' },
            { value: 11.87, name: '训练集' },
            { value: 8.01, name: '验证集' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ],
      color: ['#9a9ce6', '#71D4D4', '#76f662']
    }
    myChart2.setOption(option2)
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container{
  height: 100%;
  width: 100%;
}

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

</style>
