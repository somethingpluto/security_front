<template>
  <div class="box">
    <h2>控制台输出</h2>
    <div class="console">
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
      contextContent: []
    }
  },
  mounted() {
    this.readFile()
  },
  methods: {
    readFile() {
      this.logTxt = getLogInfo().split('\n')
      console.log(this.logTxt.length)
      setInterval(() => {
        this.contextContent.push(this.logTxt.shift())
      }, 2000)
    }
  }

}
</script>

<style lang="scss" scoped>
.box{
  height: 300px;
}
.console{
  max-height: 400px;
  overflow:auto
}
</style>
