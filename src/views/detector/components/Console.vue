<template>
  <div class="box">
    <div style="display: flex;justify-content: left;align-items: center">
      <el-image style="width: 40px;height: 40px" :src="require('../../../../src/assets/images/console.png')" />
      <h2 style="margin-left: 10px">控制台输出</h2>
      <el-button type="primary" size="medium" style="margin-left: 10px" @click="stopTrain">停止训练</el-button>
    </div>
    <div ref="console" class="console">
      <template v-if="contextContent.length === 0">
        <h2>暂无日志信息输出</h2>
      </template>
      <template v-for="item in contextContent">
        <div :key="item">
          <span>{{ item }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>

import { getLogInfo } from '@/utils/readFile'

export default {
  name: 'Console',
  data() {
    return {
      logTxt: [],
      contextContent: [],
      console: null,
      interval: null
    }
  },
  mounted() {
    this.console = this.$refs.console
  },
  methods: {
    startTrain() {
      this.contextContent = []
      this.logTxt = getLogInfo().split('\n')
      console.log(this.logTxt.length)
      this.interval = setInterval(() => {
        this.contextContent.push(this.logTxt.shift())
        this.console.scrollTop = this.console.scrollHeight
      }, 2000)
    },
    stopTrain() {
      clearInterval(this.interval)
    }
  }

}
</script>

<style lang="scss" scoped>
.box{
  height: 300px;
}
.console{
  min-height: 300px;
  max-height: 300px;
  overflow:auto;
  background-color: black;
  border-radius: 10px;
  padding: 10px;
  padding-left: 40px;
  color: white;
  font-size: 20px;
}
</style>
