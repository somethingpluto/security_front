<template>
  <div class="container">
    <el-card style="width: 90%;height: 90%">
      <div style="display: flex;justify-content: left;align-items: center">
        <div class="mode-select">
          <el-image style="width: 50px;height: 50px" :src="require('../../../assets/images/mode.png')" />
          <h2 style="margin-left: 10px">模型选择</h2>
          <el-select v-model="selectMode" style="margin-left: 10px" placeholder="请选择模型">
            <el-option
              v-for="item in modeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="database-select">
          <el-image style="width: 50px;height: 50px" :src="require('../../../assets/images/database.png')" />
          <h2 style="margin-left: 10px">模型选择</h2>
          <el-select v-model="selectMode" style="margin-left: 10px" placeholder="请选择数据集">
            <el-option
              v-for="item in modeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div>
        <div style="display: flex;justify-content: left;align-items: center">
          <el-image :src="require('../../../assets/images/args.png')" style="width: 50px;height: 50px" />
          <h2 style="margin-left: 10px">参数选择</h2>
        </div>
        <el-row type="flex">
          <div class="arg-item">
            <span>Input_Path</span>
            <el-input v-model="args.input_path" placeholder="请输入数据集文件的路径" />
          </div>
          <div class="arg-item">
            <span>Output_path</span>
            <el-input
              v-model="args.output_path"
              placeholder="请输入数据集文模型权重存放位置"
            />
          </div>
        </el-row>
        <el-row type="flex">
          <div class="arg-item">
            <span>epoch</span>
            <el-input
              v-model="args.epoch"
              placeholder="请输入训练轮次"
            />
          </div>
          <div class="arg-item">
            <span>batch_size</span>
            <el-input
              v-model="args.output_path"
              placeholder="请输入每个batch的大小"
            />
          </div>
          <div class="arg-item">
            <span>n_splits</span>
            <el-input
              v-model="args.n_splits"
              placeholder="请输入k折交叉验证中k的值"
            />
          </div>
          <div class="arg-item">
            <span>lr</span>
            <el-input
              v-model="args.lr"
              placeholder="请输入学习率"
            />
          </div>
          <div class="arg-item">
            <span>pd</span>
            <el-input
              v-model="args.pd"
              placeholder="请输入Dropout率"
            />
          </div>
        </el-row>
        <el-row type="flex">
          <div class="arg-item">
            <span>d_class</span>
            <el-input
              v-model="args.d_class"
              placeholder="请输入分类的类别"
            />
          </div>
          <div class="arg-item">
            <span>early_stop</span>
            <el-input
              v-model="args.early_stop"
              placeholder="请输入提前停止训练"
            />
          </div>
          <div class="arg-item">
            <span>device</span>
            <el-input
              v-model="args.device"
              placeholder="请输入分类的类别"
            />
          </div>
          <div class="arg-item">
            <span>d_class</span>
            <el-input
              v-model="args.d_class"
              placeholder="请输入训练设备"
            />
          </div>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'TrainHome',
  data() {
    return {
      args: {
        input_path: '',
        output_path: '',
        batch_size: '',
        epoch: '',
        n_splits: '',
        lr: '',
        pd: '',
        d_class: '',
        early_stop: '',
        device: ''
      },
      selectDatabase: '1',
      selectMode: '',
      modeOptions: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
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
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  .mode-select{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .database-select{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 40px;
  }
  .arg-item{
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    span{
      font-size: 18px;
      padding-right: 10px;
    };
  }
  .el-row{
    margin-bottom: 10px;
  }
}
</style>
