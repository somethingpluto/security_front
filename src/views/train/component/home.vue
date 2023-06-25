<template>
  <div class="container">
    <div class="left">
      <el-card style="width: 90%;height: 40%">
        <div class="title">
          <el-image :src="require('../../../assets/images/database.png')" style="width: 50px;height: 50px" />
          <h2>数据集选择</h2>
        </div>
        <h2 style="margin-bottom: 10px">当前选中数据集: {{ selectDatabase }}</h2>
        <h3>数据集列表</h3>
        <div>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

      </el-card>
      <el-card style="width: 90%;height: 40%">
        <div class="title">
          <el-image :src="require('../../../assets/images/mode.png')" style="width: 50px;height: 50px" />
          <h2>模型选择</h2>
        </div>
        <h2 style="margin-bottom: 10px">当前选中模型为: {{ selectDatabase }}</h2>
        <h3>模型列表</h3>
        <div>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </el-card>
    </div>
    <div class="right">
      <el-card style="width: 90%;height: 90%">
        <div class="title">
          <el-image :src="require('../../../assets/images/args.png')" style="width: 50px;height: 50px" />
          <h2>参数选择</h2>
        </div>
      </el-card>
      <el-card style="width: 90%;height: 90%;margin-left: 10px" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrainHome',
  data() {
    return {
      selectDatabase: '1',
      selectMode: ''
    }
  },
  methods: {
    toConsolePage() {
      this.$router.push('/train/console')
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f7f7f7;

  .left{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .right{
    height: 100%;
    flex: 4;
    display: flex;
    align-items: center;
    justify-content: center;
    .right-left{
      flex: 1;
      height: 100%;
      width: 100%;
    }
    .right-right{
      flex: 1;
      height: 100%;
      width: 100%;
    }
  }
}
.title{
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
}
</style>
