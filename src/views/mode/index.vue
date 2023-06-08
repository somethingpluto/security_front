<template>
  <div class="box">
    <el-card>
      <div>
        <div style="display: flex;align-items: center;justify-content: left">
          <el-image style="width: 40px;width: 40px" :src="require('../../../src/assets/images/list.png')" />
          <h1 style="margin-left: 10px">当前模型</h1>
        </div>
      </div>
      <div>

        <el-collapse v-model="activeTab">
          <template v-for="(item,index) in modeList">
            <el-collapse-item :key="index" :name="item.id">
              <template slot="title">
                <div :key="index" style="display: flex;align-items: center;justify-content: left">
                  <el-image style="width: 40px;width: 40px" :src="require('../../../src/assets/images/mode.png')" />
                  <h1 style="margin-left: 10px">模型ID {{ item.id }}</h1>
                  <span style="margin-left: 10px">
                    <el-tag>模型版本{{ item.tag }}</el-tag>
                  </span>
                </div>
              </template>
              <div>
                <div style="display: flex;align-items: center;justify-content: left">
                  <el-image style="width: 40px;width: 40px" :src="require('../../../src/assets/images/time.png')" />
                  <span style="margin-left: 10px">创建时间:   <el-link type="primary" style="font-size: 18px">{{ item.time }}</el-link></span>
                </div>
                <div style="display: flex;align-items: center;justify-content: left">
                  <el-image style="width: 40px;width: 40px" :src="require('../../../src/assets/images/fileDownload.png')" />
                  <span style="margin-left: 10px">文件路径:   <el-link type="primary" style="font-size: 18px">{{ item.data_path }}</el-link></span>
                  <el-button style="margin-left: 10px" size="medium" type="primary">文件下载</el-button>
                </div>
                <h2>AUC列表</h2>
                <el-table :data="item.auc_list" border stripe style="font-size: 18px">
                  <el-table-column prop="id" label="ID" align="center" />
                  <el-table-column prop="version_id" label="版本ID" align="center" />
                  <el-table-column prop="label" label="标签" align="center" />
                  <el-table-column prop="precision" label="准确度" align="center">
                    <template slot-scope="scope">
                      <el-tag :type="scope.row.precision >0.9?'success':'primary'">{{ scope.row.precision }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="recall" label="recall" align="center">
                    <template slot-scope="scope">
                      <el-tag :type="scope.row.recall >0.9?'success':'primary'">{{ scope.row.recall }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="f1" label="f1" align="center">
                    <template slot-scope="scope">
                      <el-tag :type="scope.row.f1 >=0.9?'success':'primary'">{{ scope.row.f1 }}</el-tag>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-collapse-item>
          </template>
        </el-collapse>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getModeList } from '@/api/mode'

export default {
  name: 'Mode',
  data() {
    return {
      modeList: [],
      activeTab: 1
    }
  },
  async mounted() {
    await this.fetchModeList()
  },
  methods: {
    async fetchModeList() {
      await getModeList().then((response) => {
        const data = response.data.data
        console.log(data)
        this.modeList = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  margin: 10px;
}
</style>
