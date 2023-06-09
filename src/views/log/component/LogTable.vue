<template>
  <div class="box">

    <div
      class="body"
    >
      <el-table
        v-loading="tableLoading"
        element-loading-text="日志记录加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(235, 241, 246, 0.7)"
        :data="realTableData"
        style="width: 100%;height: 100%;margin-top: 10px"
        :row-class-name="tableRowClassName"
        border
        stripe
      >
        <el-table-column
          prop="id"
          label="ID"
          width="180"
          align="center"
        />
        <el-table-column
          prop="info"
          label="邮件信息"
          align="center"
        />
        <el-table-column
          prop="from"
          label="发送方"
          align="center"
        />
        <el-table-column
          prop="to"
          label="接收方"
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
        :page-sizes="[10, 15, 20, 25]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getLogList } from '@/api/log'

export default {
  name: 'LogTable',
  data() {
    return {
      warningLevel: [{ label: 'Benign', value: 'Benign' }, { label: 'Bot', value: 'bot' }, { label: 'Dos', value: 'Dos' }, { label: 'Infiltration', value: 'Infiltration' }, { label: 'SSH-Bruteforce', value: 'SSH-Bruteforce' }, { label: 'DDos', value: 'DDos' }],
      selectValue: '',
      pagination: {
        total: 100,
        currentPage: 1,
        pageSize: 10
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
        this.realTableData = data.data
        this.pagination.total = data.total
      })
      this.tableLoading = false
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.fetchData()
    },
    handleCurrentChange(page) {
      this.pagination.currentPage = page
      this.fetchData()
    }
  }
}
</script>

<style scoped lang="scss">
.box{
  height: 100%;
  width: 100%;
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
  justify-content: right;
  align-items: center;
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

