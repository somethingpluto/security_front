<template>
  <div class="container">
    <div class="card-left card">
      <el-card style="width: 90%;height: 90%" shadow="hover" class="train card2">
        <div style="width: 100%;display: flex;justify-content: center;align-items: center">
          <el-button class="button" style="margin: auto 0" @click="toTrain">
            <h2>训练模式</h2>
          </el-button>
        </div>
      </el-card></div>
    <div class="card-right">
      <el-card style="width: 90%;height: 90%" shadow="hover" class="predict">
        <div style="width: 100%;display: flex;justify-content: center;align-items: center">
          <el-button class="button" style="margin: auto 0" @click="toTrain">
            <h2>预测模式</h2>
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/index.vue'

export default {
  name: 'Home',
  components: { Header },
  methods: {
    toTrain() {
      this.$router.push('/train/home')
    },
    toPredict() {
      this.$router.push('/predict')
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  margin: 0;
  height: calc(100% - 80px);
  width: 100%;
  display: flex;
  background-color:#f7f7f7;
  .card-left{
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card-right{
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.train{
  background: url("../../../src/assets/images/newMode.png") no-repeat center center;
  background-size: 100% 100%;
}
.predict{
  background: url("../../../src/assets/images/predict.png") no-repeat center center;
  background-size: 100% 100%;
}

</style>
<style lang="scss" scoped>

/* From www.lingdaima.com */
.button {
  width: 20em;
  height: 6em;
  border-radius: 30em;
  font-size: 15px;
  font-family: inherit;
  border: none;
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 6px 6px 12px #c5c5c5,
  -6px -6px 12px #ffffff;
}

.button::before {
  content: '';
  width: 0;
  height: 6em;
  border-radius: 30em;
  position: absolute;
  top: 0;
  left: 0;
  background-image: linear-gradient(to right, #0fd850 0%, #f9f047 100%);
  transition: .5s ease;
  display: block;
  z-index: -1;
}

.button:hover::before {
  width: 20em;
}

</style>
