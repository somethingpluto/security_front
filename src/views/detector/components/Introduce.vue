<template>
  <div class="box">
    <h2>目前仅支持csv/xlsx文件格式，内容要求如下：</h2>
    <div style="height: 280px;">
      <el-steps direction="vertical" :active="4" style="font-size: 20px">
        <el-step title="第一行为特征名或标签名，随后每一行为一条数据" />
        <el-step title="标签列应在最后一列，列名称为label" />
        <el-step title="特征列应为1~n任意列，最大不超过42" />
        <el-step title="标签列应在最后一列，列名称为label" />
      </el-steps>
    </div>
    <div style="margin-top: 10px">
      <el-button
        icon="el-icon-bottom"
        type="primary"
      >测试案例下载</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Introduce'
}
</script>

<style lang="scss" scoped>
.box{
  height: 400px;
}
</style>
