<template>
  <div class="box">
    <div class="item1">
      <el-card style="margin-left: 10px;margin-top: 10px" shadow="hover">
        <div style="display: flex;justify-content: left;align-items: center;margin-left: 10px">
          <el-image style="width: 40px;height: 40px" :src="require('../../../src/assets/images/history.png')" />
          <h2 style="margin-left: 10px">历史记录</h2>
          <el-button
            style="margin-left: 10px"
            type="primary"
            icon="el-icon-refresh"
            size="medium"
            @click="refreshTable"
          >刷新</el-button>
          <span style="margin-left: 10px">攻击类型:</span>
          <el-select v-model="selectValue" style="margin-left: 2px" placeholder="请选择攻击类型" @change="handleSelectChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <el-table
          v-loading="loading"
          element-loading-text="历史记录加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(235, 241, 246, 0.7)"
          :data="tableData"
          border
          style="width: 100%;font-size: 14px"
          :highlight-current-row="true"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            align="center"
            prop="id"
            label="id"
            width="60px"
          />
          <el-table-column
            align="center"
            prop="protocol"
            label="协议"
            width="100px"
          >
            <template slot-scope="scope">
              <el-tag :type="protocolMap[scope.row.protocol]">{{ scope.row.protocol }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="service"
            label="服务"
            width="80px"
          />
          <el-table-column
            align="center"
            prop="dst_bytes"
            label="目的字节数"
            width="100px"
          />
          <el-table-column
            align="center"
            prop="dst_port"
            label="目的端口"
            width="90px"
          />
          <el-table-column
            align="center"
            prop="label"
            label="攻击类型"
            width="120px"
          />
          <el-table-column
            align="center"
            prop="flag"
            label="标志"
            width="90px"
          />
          <el-table-column
            align="center"
            prop="duration"
            label="持续时间"
            width="90px"
          />
          <el-table-column
            align="center"
            prop="src_bytes"
            label="源字节数"
            width="90px"
          />
          <el-table-column
            align="center"
            prop="src_host"
            label="源主机"
            width="160px"
          />
          <el-table-column
            align="center"
            prop="date"
            label="日期"
            width="200px"
          />
        </el-table>
        <div style="display: flex;justify-content: right;align-items: center">
          <el-pagination
            :current-page="pagination.currentPage"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card></div>
    <div class="item2">
      <el-card>
        <div style="display: flex;justify-content: left;align-items: center">
          <el-image style="width: 40px;height: 40px" :src="require('../../../src/assets/images/statistics.png')" />
          <h2 style="margin-left: 10px">当前页服务统计</h2>
        </div>
        <div id="tablePieChart" ref="tablePieChart" />
        <div style="display: flex;justify-content: left;align-items: center">
          <el-image style="width: 40px;height: 40px" :src="require('../../../src/assets/images/shuju.png')" />
          <h2 style="margin-left: 10px">流量统计: <span style="color: #20a0ff">{{ this.totalBytes }} bytes</span></h2>
        </div>
        <div id="tableHalfPieChart" ref="tableHalfPieChart" />
      </el-card>
    </div>
  </div>
</template>

<script>

import { getRecordsData, getRecordsDataByLabel } from '@/api/history'
import * as echarts from 'echarts'

export default {
  data() {
    return {
      tableData: [],
      pagination: {
        total: 100,
        currentPage: 1,
        pageSize: 10
      },
      loading: false,
      protocolMap: {
        'icmp': 'success',
        'udp': 'info',
        'tcp': 'warning'
      },
      pieData: [],
      icmp: { value: 0, name: 'icmp' },
      tcp: { value: 0, name: 'tcp' },
      udp: { value: 0, name: 'udp' },
      halfPieChartData: [],
      dstBytes: { name: '目的字节数', value: 0 },
      srcBytes: { name: '源字节数', value: 0 },
      totalBytes: 0,
      options: [{
        value: 'DDoS attack-HOIC',
        label: 'DDoS attack-HOIC'
      }, {
        value: 'Benign',
        label: 'Benign'
      }, {
        value: 'Infiltration',
        label: 'Infiltration'
      }, {
        value: 'SSH-Bruteforce',
        label: 'SSH-Bruteforce'
      }, {
        value: 'Dos attacks-GoldenEye',
        label: 'Dos attacks-GoldenEye'
      }],
      selectValue: '',
      dialogVisible: false
    }
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loading = true
      await getRecordsData(this.pagination.currentPage, this.pagination.pageSize).then((response) => {
        const data = response.data.data
        this.tableData = data.data
        this.pagination.total = data.total
        // 初始化
        this.pieData = []
        this.halfPieChartData = []
        this.tcp.value = 0
        this.udp.value = 0
        this.icmp.value = 0
        this.dstBytes.value = 0
        this.srcBytes.value = 0
        for (const item of data.data) {
          this.dstBytes.value += item.dst_bytes
          this.srcBytes.value += item.src_bytes
          switch (item.protocol) {
            case 'icmp':
              this.icmp.value++
              break
            case 'tcp':
              this.tcp.value++
              break
            case 'udp':
              this.udp.value++
              break
          }
        }
        this.pieData.push(this.icmp, this.tcp, this.udp)
        this.halfPieChartData.push(this.dstBytes, this.srcBytes)
        this.halfPieChartData.push({
          value: this.srcBytes.value + this.dstBytes.value,
          itemStyle: {
            // stop the chart from rendering this piece
            color: 'none',
            decal: {
              symbol: 'none'
            }
          },
          label: {
            show: false
          }
        })
        this.totalBytes = this.dstBytes.value + this.srcBytes.value
        this.initPieGraph()
        this.initHalfPieGraph()
        this.loading = false
      })
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size
      if (this.selectValue === '') {
        this.fetchData()
      } else {
        this.fetchRecordDataByLabel()
      }
    },
    handleCurrentChange(pageNum) {
      this.pagination.currentPage = pageNum
      if (this.selectValue === '') { this.fetchData() } else {
        this.fetchRecordDataByLabel()
      }
    },
    initPieGraph() {
      const myChart = echarts.init(this.$refs.tablePieChart)
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
      myChart.setOption(option)
    },
    initHalfPieGraph() {
      const myChart = echarts.init(this.$refs.tableHalfPieChart)
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center',
          // doesn't perfectly work with our tricks, disable it
          selectedMode: false
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '70%'],
            // adjust the start angle
            startAngle: 180,
            label: {
              show: true,
              formatter(param) {
                // correct the percentage
                return param.name + ' (' + param.percent * 2 + '%)'
              }
            },
            data: this.halfPieChartData
          }
        ]
      }
      myChart.setOption(option)
    },
    refreshTable() {
      this.selectValue = ''
      this.pagination.currentPage = 1
      this.pagination.pageSize = 10
      this.fetchData()
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.protocol === 'icmp') {
        return 'icmp'
      } else if (row.protocol === 'tcp') {
        return 'tcp'
      } else {
        return ''
      }
    },
    handleSelectChange() {
      this.pagination.currentPage = 1
      this.pagination.pageSize = 10
      this.fetchRecordDataByLabel()
    },
    async fetchRecordDataByLabel() {
      this.loading = true
      await getRecordsDataByLabel(this.pagination.currentPage, this.pagination.pageSize, this.selectValue).then((response) => {
        const data = response.data.data
        console.log(data)
        this.tableData = data.data
        this.pagination.total = data.total
        this.pieData = []
        this.halfPieChartData = []
        this.tcp.value = 0
        this.udp.value = 0
        this.icmp.value = 0
        this.dstBytes.value = 0
        this.srcBytes.value = 0
        for (const item of data.data) {
          this.dstBytes.value += item.dst_bytes
          this.srcBytes.value += item.src_bytes
          switch (item.protocol) {
            case 'icmp':
              this.icmp.value++
              break
            case 'tcp':
              this.tcp.value++
              break
            case 'udp':
              this.udp.value++
              break
          }
        }
        this.pieData.push(this.icmp, this.tcp, this.udp)
        this.halfPieChartData.push(this.dstBytes, this.srcBytes)
        this.halfPieChartData.push({
          value: this.srcBytes.value + this.dstBytes.value,
          itemStyle: {
            // stop the chart from rendering this piece
            color: 'none',
            decal: {
              symbol: 'none'
            }
          },
          label: {
            show: false
          }
        })
        this.totalBytes = this.dstBytes.value + this.srcBytes.value
        this.initPieGraph()
        this.initHalfPieGraph()
        this.loading = false
      })
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
.box{
  height: 100%;
  display: flex;
  justify-content: left;
  position: relative;
  .item1{
    flex: 3;
  }
  .item2{
    margin-top: 10px;
    flex: 1.5;
    margin-left: 10px;
    #tablePieChart{
      width: 100%;
      height: 390px
    }
    #tableHalfPieChart{
      width: 100%;
      height: 250px;
    }
  }
}
</style>
<style>
.el-table .icmp {
  background: #f0f9eb;
}

.el-table .tcp {
  background: #fdf6ec;
}
</style>

