<template>
  <div class="box">
    <el-table
      v-loading="loading"
      element-loading-text="历史记录加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="日期"
        width="180"
      />
      <el-table-column
        prop="protocol"
        label="协议"
        width="180"
      />
      <el-table-column
        prop="service"
        label="服务"
      />
      <el-table-column
        prop="dst_bytes"
        label="目的字节数"
      />
      <el-table-column
        prop="dst_port"
        label="目的端口"
      />
      <el-table-column
        prop="label"
        label="标签"
      />
      <el-table-column
        prop="flag"
        label="标志"
      />
      <el-table-column
        prop="duration"
        label="持续事件"
      />
      <el-table-column
        prop="src_bytes"
        label="源字节数"
      />
      <el-table-column
        prop="src_host"
        label="源主机"
      />
      <el-table-column
        prop="date"
        label="日期"
      />
    </el-table>
  </div>
</template>

<script>

import { getRecordsData } from '@/api/history'

export default {
  data() {
    return {
      tableData: [],
      pagination: {
        total: 100,
        currentPage: 1,
        pageSize: 10
      },
      loading: false
    }
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getRecordsData(this.pagination.currentPage, this.pagination.pageSize).then((response) => {
        console.log(response.data.data)
        this.tableData = response.data.data.data
        this.pagination = response.data.data.total
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
</style>

