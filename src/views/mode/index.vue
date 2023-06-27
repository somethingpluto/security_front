<template>
  <div class="container">
    <el-card style="width: 96%;height: 90%">
      <div style="display: flex;justify-content: left;align-items: center">
        <el-image style="width: 60px;height: 60px" :src="require('../../../src/assets/images/mode.png')" />
        <h1 style="margin-left: 15px">模型列表</h1>
      </div>
      <div>
        <el-table
          ref="filterTable"
          :data="tableData"
          style="width: 100%"
          border
          stripe
          align="center"
        >
          <el-table-column
            type="index"
            align="center"
          />
          <el-table-column
            prop="name"
            label="名称"
            align="center"
            width="120p'x"
          />
          <el-table-column
            prop="args"
            label="参数"
            align="center"
            width="200px"
          >
            <template slot-scope="scope">
              {{ scope.row.args ===''?'参数为空':scope.row.args }}
            </template>
          </el-table-column>
          <el-table-column
            prop="envPath"
            label="环境路径"
            align="center"
            width="200px"
          />
          <el-table-column
            prop="mainPath"
            label="主路径"
            align="center"
            width="200px"
          />
          <el-table-column prop="logPath" align="center" label="日志路径" />
          <el-table-column prop="logPath" align="center" label="模型路径" />
          <el-table-column
            prop="state"
            label="运行状态"
            align="center"
            width="100px"
          >
            <template slot-scope="scope">
              <el-tag :type="scope.row.state === '未运行'?'danger':'success'">{{ scope.row.state }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="300p'x"
          >
            <template slot-scope="scope">
              <div style="display: flex;justify-content: space-around;align-items: center;padding-left: 5px;padding-right: 5px;">
                <el-button type="primary" size="mini" @click="startInstances(scope.row.path)">启动</el-button>
                <el-button type="warning" size="mini" @click="stopInstances(scope.row.path)">停止</el-button>
                <el-button type="danger" size="mini" @click="deleteInstances(scope.row.path)">删除</el-button>
                <el-button type="success" size="mini" @click="connectToInstance(scope.row)">连接</el-button>
              </div>
            </template></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { deleteMode, fetchModeList, runningMode, stopMode } from '@/api/mode'

export default {
  name: 'Mode',
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.getModeListData()
  },
  methods: {
    async getModeListData() {
      this.tableData = []
      await fetchModeList().then((response) => {
        console.log(response.data)
        const dataObj = response.data
        for (const key in dataObj) {
          console.log(key)
          this.tableData.push(dataObj[key])
          console.log(this.tableData)
        }
      })
    },
    async startInstances(id) {
      await runningMode(id).then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: id + '启动成功'
          })
        }
        this.getModeListData()
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: id + '启动失败 ' + err
        })
      })
    },
    async stopInstances(id) {
      await stopMode(id).then((res) => {
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: id + '停止成功'
          })
        }
        this.getModeListData()
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'error',
          message: id + '停止失败 ' + err
        })
      })
    },
    async deleteInstances(id) {
      await deleteMode(id).then((res) => {
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: id + '删除成功'
          })
        }
        this.getModeListData()
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'error',
          message: id + '删除失败' + err
        })
      })
    },
    connectToInstance(data) {
      console.log('run')
      console.log(data)
      if (data.state === '未运行') {
        this.$message({
          type: 'warning',
          message: '实例还未运行'
        })
        return
      }
      this.$router.push({ path: `/console/${data.path}`, params: { id: data.path }})
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  height: calc(100% - 80px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f7f7f7;
}
</style>
