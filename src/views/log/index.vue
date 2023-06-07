<template>
  <div class="box">
    <div class="log-card">
      <el-card style="min-height: 100%" shadow="hover">
        <LogTable />
      </el-card></div>
    <div class="log-chart">
      <el-card style="min-height: 100%">
        <log-chart />
      </el-card></div>
  </div>
</template>

<script>
import LogTable from '@/views/log/component/LogTable.vue'
import LogChart from '@/views/log/component/LogChart.vue'

export default {
  components: { LogChart, LogTable },
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin-top: 10px;
  .log-card{
    flex: 3;
    min-eight: 100%;
    margin-left: 10px;
    margin-right: 10px;
  }
  .log-chart{
    flex: 1.2;
    height: 100%;
    margin-right: 10px;
  }
}
</style>

