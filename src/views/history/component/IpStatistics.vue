<template>
  <div class="box">
    <el-table
      v-loading="loading"
      element-loading-text="ip数据统计中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(235, 241, 246, 0.7)"
      :data="tableData"
      style="width: 100%"
      border
      height="500px"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        type="index"
        label="序号"
        align="center"
      />
      <el-table-column
        prop="ip"
        label="攻击ip"
        align="center"
        width="150px"
      />
      <el-table-column
        prop="address"
        label="ip属地"
        width="140px"
        align="center"
      />
      <el-table-column
        prop="attack_name"
        label="攻击类型"
        align="center"
      />
      <el-table-column
        prop="start_time"
        label="攻击开始时间"
        align="center"
      />
      <el-table-column
        prop="end_time"
        label="攻击结束时间"
        align="center"
      />
      <el-table-column
        prop="count"
        label="攻击次数"
        align="center"
        width="80px"
      />
    </el-table>
  </div>
</template>

<script>
import { getIpStatisticData } from '@/api/history'

export default {
  name: 'IpStatistic',
  data() {
    return {
      tableData: [],
      loading: false
    }
  },
  mounted() {
    this.fetchIpStatisticData()
  },
  methods: {
    async fetchIpStatisticData() {
      this.loading = true
      await getIpStatisticData().then((response) => {
        const data = response.data.data
        this.tableData = data
      })
      this.loading = false
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex <= 3) {
        return 'one-three'
      } else if (rowIndex > 3 && rowIndex <= 7) {
        return 'three-seven'
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
<style>
.el-table .one-three {
  background: #fdf6ec;
}

.el-table .three-seven {
  background: #f0f9eb;
}
</style>
