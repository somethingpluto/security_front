<template>
  <div class="container">
    <TrainHome />
  </div>
</template>

<script>
import Home from '@/views/home/index.vue'
import TrainHome from '@/views/train/component/home.vue'

export default {
  name: 'Train',
  components: { TrainHome, Home }
}
</script>

<style lang="scss" scoped>
.container{
  height: calc(100% - 80px);
  width: 100%;
  background-color: #f7f7f7;
}
</style>
