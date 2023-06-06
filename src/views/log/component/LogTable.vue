<template>
  <div
    v-loading="tableLoading"
    class="box"
    element-loading-text="日志记录加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(235, 241, 246, 0.7)"
  >
    <div class="header">
      <span style="width: 120px">攻击类型:</span>
      <el-select v-model="selectValue" style="margin-right: 10px" placeholder="请选择攻击类型">
        <el-option
          v-for="item in warningLevel"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <span style="float: left">{{ item.label }}</span>
        </el-option>
      </el-select>
      <span style="width: 120px;">攻击概述:</span>
      <el-input v-model="inputValue" clearable style="margin-right: 10px" placeholder="请输入记录类型" />
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <el-button type="primary" @click="ipTrace">
        IP溯源
      </el-button>
    </div>
    <div
      class="body"
    >
      <el-table
        :data="realTableData"
        style="width: 100%;height: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="180"
          align="center"
        />
        <el-table-column
          prop="type"
          label="类型"
          width="180"
          align="center"
        />
        <el-table-column
          prop="srcIP"
          label="源IP"
          align="center"
        />
        <el-table-column
          prop="dstIP"
          label="目的IP"
          align="center"
        />
        <el-table-column
          prop="duration"
          label="攻击持续时间s"
          align="center"
        />
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        :current-page="pagination.currentPage"
        :page-sizes="[12, 25, 20, 25]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      />
    </div>
  </div>
</template>

<script>
import fa from 'element-ui/src/locale/lang/fa'

export default {
  name: 'LogTable',
  data() {
    return {
      warningLevel: [{ label: 'Benign', value: 'Benign' }, { label: 'Bot', value: 'bot' }, { label: 'Dos', value: 'Dos' }, { label: 'Infiltration', value: 'Infiltration' }, { label: 'SSH-Bruteforce', value: 'SSH-Bruteforce' }, { label: 'DDos', value: 'DDos' }],
      selectValue: '',
      tableData: [{
        date: '2023-06-02 19:25:27',
        type: 'DDos',
        srcIP: '35.214.147.27',
        dstIP: '198.34.85.30',
        duration: '19'
      }, {
        date: '2023-06-04 03:09:48',
        type: 'DDos',
        srcIP: '207.137.216.129',
        dstIP: '6.64.200.166',
        duration: '16'

      }, {
        date: '2023-06-05 18:19:35',
        type: 'Dos',
        srcIP: '197.96.39.137',
        dstIP: '212.208.220.167',
        duration: '32'

      }, {
        date: '2023-06-02 13:24:14',
        type: 'DDos',
        srcIP: '96.244.218.102',
        dstIP: '3.181.234.219',
        duration: '54'

      }, {
        date: '2023-06-02 18:28:19',
        type: 'Bot',
        srcIP: '120.111.248.73',
        dstIP: '145.223.43.86',
        duration: '32'

      }, {
        date: '2023-06-03 09:49:18',
        type: 'SSH-Bruteforce',
        srcIP: '56.139.198.145',
        dstIP: '51.137.155.209',
        duration: '76'

      }, {
        date: '2023-06-02 06:07:16',
        type: 'SSH-Bruteforce',
        srcIP: '83.206.87.2',
        dstIP: '234.3.215.26',
        duration: '8'

      }, {
        date: '2023-06-01 21:35:01',
        type: 'SSH-Bruteforce',
        srcIP: '192.68.128.194',
        dstIP: '33.51.33.217',
        duration: '11'

      }, {
        date: '2023-06-01 16:12:24',
        type: 'DDos',
        srcIP: '116.89.168.174',
        dstIP: '218.59.218.223',
        duration: '24'

      }, {
        date: '2023-06-01 21:07:23',
        type: 'Bot',
        srcIP: '146.55.212.212',
        dstIP: '21.29.161.9',
        duration: '40'
      },
      {
        date: '2023-06-01 04:53:40',
        type: 'DDos',
        srcIP: '119.250.41.29',
        dstIP: '110.91.144.121',
        duration: '40'
      },
      {
        date: '2023-06-03 18:26:25',
        type: 'Bot',
        srcIP: '119.170.250.129',
        dstIP: '199.213.25.237',
        duration: '40'
      }],
      pagination: {
        total: 100,
        currentPage: 1,
        pageSize: 12
      },
      inputValue: '',
      realTableData: [],
      tableLoading: false
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.type === 'DDos') {
        return 'ddos'
      } else if (row.type === 'Bot') {
        return 'bot'
      } else if (row.type === 'SSH-Bruteforce') {
        return 'ssh'
      }
      return ''
    },
    ipTrace() {
      this.$router.push('/history/index')
    },
    fetchData() {
      this.tableLoading = true
      setTimeout(() => {
        this.realTableData = this.tableData
        this.tableLoading = false
        this.pagination.total = this.realTableData.length
      }, 1500)
    }
  }
}
</script>

<style scoped lang="scss">
.box{
  height: 100%;
  display: flex;
  flex-direction: column;
  .header{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .body{
    width: 100%;
    min-height: 600px;
  }
}
.pagination{
  float: right;
}

</style>
<style>
.el-table .ddos {
  background: #f0f9eb;
}

.el-table .ssh {
  background: #fdf6ec;
}
.el-table .bot {
  background: #f5f7fa;
}
</style>

