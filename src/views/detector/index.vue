<template>
  <div class="box">
    <el-card style="margin:10px">
      <div class="header">
        <div style="display: flex;justify-content: left;align-items: center">
          <el-image style="width: 40px;height: 40px" :src="require('../../../src/assets/images/file.png')" />
          <h2>文件上传</h2>
        </div>
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          style="display: flex;justify-content: center;align-items: center;flex-direction: column;width: 100%"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <div class="body">
        <el-tabs v-model="activeName">
          <el-tab-pane label="上传文件要求" name="introduce">
            <Introduce />
          </el-tab-pane>
          <el-tab-pane label="控制台输出" name="console">
            <Console />
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
      activeName: 'introduce'

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
  padding: 10px;
  border: 3px #409eff dashed;
}
.el-icon-upload{
  width: 100%;
}
.el-upload{
  width: 100%;
}
</style>
