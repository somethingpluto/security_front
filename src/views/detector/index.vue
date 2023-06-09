<template>
  <div class="box">
    <el-card style="margin:10px">
      <div class="header">
        <div style="display: flex;justify-content: space-between;align-items: center">
          <div style="display: flex;justify-content: left;align-items: center">
            <el-image style="width: 40px;height: 40px" :src="require('../../../src/assets/images/file.png')" />
            <h2>文件上传</h2>
          </div>
          <div>
            <el-button type="primary" @click="startTrain">开始训练</el-button>
            <el-select v-model="exerciseTurn" style="margin-left: 10px;width: 150px" placeholder="请选择训练轮次">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          style="display: flex;justify-content: center;align-items: center;flex-direction: column;width: 100%"
          :file-list="fileList"
          :on-success="uploadSuccess"
        >
          <i class="el-icon-upload" style="width: 100%" />
          <div class="el-upload__text" style="width: 100%">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">只能上传csv，xlsx文件，且不超过300MB</div>
        </el-upload>
      </div>
      <div />
      <div class="body">
        <el-tabs v-model="activeName">
          <el-tab-pane label="上传文件要求" name="introduce">
            <Introduce />
          </el-tab-pane>
          <el-tab-pane label="控制台输出" name="console">
            <Console ref="consoleComponent" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>
<script>
import Introduce from '@/views/detector/components/Introduce.vue'
import Console from '@/views/detector/components/Console.vue'

export default {
  name: 'Detector',
  components: { Console, Introduce },
  data() {
    return {
      activeName: 'introduce',
      exerciseTurn: '',
      options: [{
        value: '5',
        label: '5'
      }, {
        value: '10',
        label: '10'
      }, {
        value: '15',
        label: '15'
      }
      ],
      fileList: []
    }
  },
  methods: {
    startTrain() {
      if (this.exerciseTurn === '') {
        this.$message({
          type: 'warning',
          message: '请选择训练轮次'
        })
      } else {
        if (this.fileList.length === 0) {
          this.$message({
            type: 'warning',
            message: '请先上传文件'
          })
          return
        }
        this.activeName = 'console'
        this.$refs.consoleComponent.startTrain()
      }
    },
    uploadSuccess(response, file, fileList) {
      console.log(response)
      this.fileList = fileList
    }
  }
}
</script>

<style lang="scss" scoped>
.box{
  width: 100%;
  height: 100%;
  .body{
    margin-top: 40px;
  }
}
.upload-demo{
  width: 100%;
  padding: 10px;
  border: 3px #409eff dashed;
}
.el-icon-upload{
  width: 100%;
}
.el-upload{
  width: 100%;
}
.el-upload__text{
  font-size: 18px;
}
.el-upload__tip{
  font-size: 18px;
}
.el-upload{
  width: 100%;
}
</style>
