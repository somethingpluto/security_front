<template>
  <div
    v-loading="tableLoading"
    class="box"
    element-loading-text="日志记录加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(235, 241, 246, 0.7)"
  >
    <div class="header">
      <div>
        <span style="width: 120px">攻击类型:</span>
        <el-select v-model="selectValue" style="margin-right: 10px;width: 180px" placeholder="请选择攻击类型">
          <el-option
            v-for="item in warningLevel"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.label }}</span>
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="()=>{this.dialogVisible = true}">
        风险IP
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
          prop="id"
          label="ID"
          width="180"
          align="center"
        />
        <el-table-column
          prop="info"
          label="信息"
          align="center"
        />
        <el-table-column
          prop="from"
          label="来自"
          align="center"
        />
        <el-table-column
          prop="date"
          label="日期"
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
    <el-dialog
      :visible.sync="dialogVisible"
      width="65%"
      :destroy-on-close="true"
      title="风险ip列表"
      style="height: 400px"
    >
      <IpStatistic />
    </el-dialog>
  </div>
</template>

<script>

import IpStatistic from '@/views/log/component/IpStatistics.vue'
import { getLogList } from '@/api/log'

export default {
  name: 'LogTable',
  components: { IpStatistic },
  data() {
    return {
      warningLevel: [{ label: 'Benign', value: 'Benign' }, { label: 'Bot', value: 'bot' }, { label: 'Dos', value: 'Dos' }, { label: 'Infiltration', value: 'Infiltration' }, { label: 'SSH-Bruteforce', value: 'SSH-Bruteforce' }, { label: 'DDos', value: 'DDos' }],
      selectValue: '',
      pagination: {
        total: 100,
        currentPage: 1,
        pageSize: 12
      },
      inputValue: '',
      realTableData: [],
      tableLoading: false,
      dialogVisible: false,
      tableData: []
    }
  },
  async mounted() {
    await this.fetchData()
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
    async fetchData() {
      this.tableLoading = true
      await getLogList(this.pagination.currentPage, this.pagination.pageSize).then((response) => {
        const data = response.data.data
        console.log(data)
        this.tableData = data.data
        this.pagination.total = data.total
      })
      this.tableLoading = false
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
    justify-content: left;
    align-items: center;
  }
  .body{
    width: 100%;
    min-height: 632px;
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

