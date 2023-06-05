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
      <el-card
        v-loading="pieLoading"
        style="flex: 2"
        shadow="hover"
        element-loading-text="攻击事件统计中...."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(235, 241, 246, 0.7)"
      >
        <div style="display: flex;justify-content: left;align-items: center">
          <el-image style="width: 40px;height: 40px" :src="require('../../assets/images/analyse.png')" />
          <h2 style="margin-left: 15px">攻击事件统计</h2>
          <div style="display: flex;justify-content: center;align-items: center;margin-left: 30px">
            <el-image style="width: 40px;height: 40px" :src="require('../../assets/images/warning.png')" />
            <h3 style="color: red;">最多攻击事件{{ maxAttack }}</h3>
          </div>
        </div>
        <div class="item2">
          <div id="pie" ref="pie" />
          <el-button icon="el-icon-menu" type="primary" @click="toDetailStatic">详细分析</el-button>
        </div>
      </el-card>
      <el-card
        v-loading="lineLoading"
        style="flex: 2;margin-left: 10px;margin-right: 10px"
        shadow="hover"
        element-loading-text="攻击事件分析中...."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(235, 241, 246, 0.7)"
      >
        <div style="display: flex;justify-content: left;align-items: center">
          <el-image style="width: 40px;height: 40px" :src="require('../../assets/images/statistics.png')" />
          <h2 style="margin-left: 15px">攻击事件分析</h2>
        </div>
        <div>
          <div class="item1">
            <div id="lineChart" ref="lineChart" />
            <el-button icon="el-icon-menu" type="primary">详细分析</el-button>
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
import { getDashboardData } from '@/api/dashboard'
import fa from 'element-ui/src/locale/lang/fa'

export default {
  name: 'Dashboard',
  components: { PanelGroup },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  async mounted() {
    await this.fetchData()
    this.initLineGraph()
    this.initPieGraph()
    this.initLineAreaGraph()
  },
  data() {
    return {
      maxAttackType: 'DDos',
      pieData: [],
      maxAttack: '',
      pieLoading: false,
      lineLoading: false,
      attackNum: []

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
          formatter: ''
        },
        legend: {
          data: ['攻击次数']
        },
        xAxis: {
          data: this.getDate().reverse()
        },
        yAxis: [{
          type: 'value',
          name: '攻击次数',
          show: true,
          axisLine: {
            lineStyle: {
              color: '#5e859e',
              width: 2
            }
          }
        }],
        series: [{
          name: '攻击次数',
          type: 'bar',
          barWidth: '50%',
          data: this.attackNum
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
            data: this.pieData,
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
    },
    toDetailStatic() {
      this.$router.push('/detail')
    },
    async fetchData() {
      this.pieLoading = true
      this.lineLoading = true
      await getDashboardData().then((response) => {
        // 获取数据
        const data = response.data.data
        console.log(data)
        this.attackNum = data.analysis.attack_num
        // 拼接pie 数据 查找最大值
        let maxIndex = 0
        for (let i = 0; i < data.statistics.attack_name.length; i++) {
          const obj = { value: data.statistics.attack_num[i], name: data.statistics.attack_name[i] }
          this.pieData.push(obj)
          if (data.statistics.attack_num[i] > data.statistics.attack_num[maxIndex]) {
            maxIndex = i
          }
        }
        this.maxAttack = data.statistics.attack_name[maxIndex]
        //   获取条形图数据
        this.attackNum = data.analysis.attack_num.reverse()
      })
      this.pieLoading = false
      this.lineLoading = false
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .item2{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
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
