<template>
  <div class="box">
    <h2>目前仅支持csv/xlsx文件格式，内容要求如下：</h2>
    <div style="height: 200px;">
      <el-steps direction="vertical" :active="4" style="font-size: 20px">
        <el-step title="1.第一行为特征名或标签名，随后每一行为一条数据" />
        <el-step title="2.标签列应在最后一列，列名称为label" />
        <el-step title="3.特征列应为1~n任意列，最大不超过42" />
        <el-step title="4.标签列应在最后一列，列名称为label" />
      </el-steps>
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
  height: 300px;
}
</style>
