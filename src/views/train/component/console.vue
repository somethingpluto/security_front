<template>
  <div class="container">
    <div class="box">
      <div class="console">
        <el-card style="width: 80%;height: 800px;background: black;color: white">
          <template v-for="(item,index) in messageList">
            <div :key="index" style="color: greenyellow;padding-bottom: 5px">{{ index+1 }} {{ dateList[index] }}</div>
            <div :key="index" style="color: #ffffff;font-size: 18px">{{ item }}</div>
          </template>
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
import { sendWebsocket } from '@/utils/ws'

export default {
  name: 'TrainConsole',
  data() {
    return {
      messageList: [],
      dateList: []
    }
  },
  mounted() {
    this.requestWs()
  },
  methods: {
    checkResult() {
      this.$router.push('/train/result')
    },
    wsMessage(data) {
      console.log(data)
      this.messageList.push(data)
      this.dateList.push(this.getNodeTime())
      // 这里写拿到数据后的业务代码
    },
    // ws连接失败，组件要执行的代码
    wsError() {
      // 比如取消页面的loading
    },
    requestWs() {
      const id = this.$route.params.id
      sendWebsocket(`ws://127.0.0.1:8080/pty/ws/${id}`, {}, this.wsMessage, this.wsError)
    }, getNodeTime() {
      return new Date().toLocaleString('zh', {
        hour12: false,
        timeZone: 'Asia/Shanghai'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  height: calc(100% - 80px);
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
