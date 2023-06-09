<template>
  <div class="box">
    <div class="log-card">
      <el-card style="min-height: 100%" shadow="hover">
        <div class="header">
          <div style="display: flex;justify-content: left;align-items: center">
            <el-image style="width: 40px;height: 40px" :src="require('../../../src/assets/images/logHeader.png')" />
            <h2>日志列表</h2>
          </div>
          <div>
            <el-button type="primary" @click="()=>{this.dialogVisible = true}">
              查看风险IP
            </el-button>
          </div>
        </div>
        <LogTable />
      </el-card></div>
    <!--    <div class="log-chart">-->
    <!--      <el-card style="min-height: 100%">-->
    <!--        <log-chart />-->
    <!--      </el-card></div>-->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="'风险IP列表'"
      width="65%"
      :destroy-on-close="true"
    >
      <IpStatistic />
    </el-dialog>
  </div>
</template>

<script>
import LogTable from '@/views/log/component/LogTable.vue'
import IpStatistic from '@/views/log/component/IpStatistics.vue'

export default {
  components: { IpStatistic, LogTable },
  data() {
    return {
      dialogVisible: false
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
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

