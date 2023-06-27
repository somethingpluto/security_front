<template>
  <div class="container">
    <div style="height: 80px" class="header">
      <div style="display: flex;justify-content: left;align-items: center;padding-left: 80px;height: 100%">
        <el-image :src="require('../../src/assets/images/logo.png')" style="width: 60px;height: 60px" />
        <h2 style="margin-left: 20px">xxx系统</h2>
      </div>
      <div style="padding-right: 80px;">
        <el-button size="medium" type="primary" @click="toModeManage">模型管理</el-button>
        <el-button size="medium" type="primary" @click="toDatabaseManage">数据集管理</el-button>
      </div>
    </div>
    <RouterView />
  </div>
</template>

<script>
export default {
  name: 'Layout',
  methods: {
    toModeManage() {
      this.$router.push('/mode')
    },
    toDatabaseManage() {
      this.$router.push('/database')
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  height: 100%;
  width: 100%;
  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
