<template>
  <div class="container">
    <div class="box">
      <div class="console">
        <el-card style="width: 80%;height: 800px">
          console
        </el-card>
      </div>
      <div class="result">
        <el-card style="width: 80%;height: 800px">
          result
          <el-button type="primary" @click="checkResult">查看结果</el-button>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrainConsole',
  methods: {
    checkResult() {
      this.$router.push('/train/result')
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  height: 100%;
  width: 100%;
  .box{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .console{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .result{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
