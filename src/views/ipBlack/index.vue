<template>
  <div class="box">
    <el-card shadow="hover">
      <div style="display: flex;justify-content: left;align-items: center">
        <el-image style="width: 40px;height: 40px" :src="require('../../../src/assets/images/blackip.png')" />
        <h2 style="margin-left: 10px">IP黑名单</h2>
      </div>
      <div style="width: 400px;display: flex;justify-content: left;align-items: center">
        <el-input
          v-model="blackIp"
          placeholder="请输入要加入黑名单的ip"
          clearable
        />
        <el-button
          style="margin-left: 10px"
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addBlackIp"
        >添加</el-button>
        <el-button
          style="margin-left: 10px"
          type="primary"
          icon="el-icon-refresh"
          @click="refresh"
        >刷新</el-button>
      </div>
      <div>
        <el-table
          v-loading="loading"
          style="margin-top: 10px"
          element-loading-text="ip黑名单读取中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(235, 241, 246, 0.7)"
          :data="tableData"
          border
          stripe
        >
          <el-table-column prop="id" label="ID" align="center" />
          <el-table-column prop="ip" label="IP" align="center" />
          <el-table-column prop="grade" label="等级" align="center" />
          <el-table-column prop="status" label="状态" align="center" />
          <el-table-column prop="create_time" label="创建时间" align="center" />
          <el-table-column prop="update_time" label="更新时间" align="center" />
        </el-table>
        <div style="display: flex;justify-content: right;align-items: center;margin-top: 10px">
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
      </div>
    </el-card>
  </div>
</template>

<script>
import { addIptoBlackList, getBlackIpList } from '@/api/blackip'

export default {
  name: 'BlackIP',
  data() {
    return {
      pagination: {
        total: 100,
        currentPage: 1,
        pageSize: 10
      },
      tableData: [],
      loading: false,
      blackIp: ''
    }
  },
  mounted() {
    this.fetchBlackIpList()
  },
  methods: {
    async fetchBlackIpList() {
      this.loading = true
      await getBlackIpList(this.pagination.currentPage, this.pagination.pageSize).then((response) => {
        const data = response.data.data
        console.log(data)
        this.tableData = data.data
        this.pagination.total = data.total
        this.loading = false
      })
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.fetchBlackIpList()
    },
    handleCurrentChange(page) {
      this.pagination.currentPage = page
      this.fetchBlackIpList()
    },
    refresh() {
      this.blackIp = ''
      this.pagination.currentPage = 1
      this.pagination.pageSize = 10
      this.fetchBlackIpList()
    },
    async addBlackIp() {
      await addIptoBlackList(this.blackIp).then((response) => {
        const data = response.data.data
        console.log(data)
        this.$message({
          type: 'success',
          message: '添加黑名单成功'
        })
      })
      this.refresh()
    },
    tableRowClassName({ row, rowIndex }) {
      console.log(row.grade)
      if (row.grade === 2) {
        return 'two'
      } else if (row.grade === 3) {
        return 'three'
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.box{
 margin: 10px;
}
</style>

<style>
.el-table .two {
  background: #f0f9eb;
}

.el-table .three {
  background: #fdf6ec;
}
</style>
