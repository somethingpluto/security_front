<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper ">
          <span>
            <el-image :src="require('../../../assets/images/attack.png')" />
          </span>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            攻击总数较上阶段
            <span style="font-size: 36px;color: red;padding-left: 10px">+</span><count-to style="color: red" :start-val="0" :end-val="panelGroupData.attackAddNum" :duration="2600" class="card-panel-num" />
          </div>
          <h1>4523</h1>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper ">
          <span>
            <el-image :src="require('../../../assets/images/normal.png')" />
          </span>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            正常类型较上阶段
            <span style="font-size: 36px;color: #34d034;padding-left: 10px">-</span><count-to style="color: #34d034" :start-val="0" :end-val="panelGroupData.normalNum" :duration="2600" class="card-panel-num" />
          </div>
          <h1>25780</h1>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper ">
          <span>
            <el-image :src="require('../../../assets/images/check.png')" />
          </span>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            监测总数
            <span style="font-size: 36px;color: #34d034;padding-left: 10px">-</span><count-to style="color: #34d034" :start-val="0" :end-val="panelGroupData.totalCheck" :duration="2600" class="card-panel-num" />
          </div>
          <h1>30303</h1>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  components: {
    CountTo
  },
  data() {
    return {
      panelGroupData: {
        attackAddNum: 600,
        normalNum: 3206,
        totalCheck: 2606
      }
    }
  },
  watch: {
    data: {
      handler: function(newData, oldData) {
        this.panelGroupData = newData
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 128px;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    display: flex;
    justify-content: left;
    align-items: center;
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      margin-left: 10px;
      width: 60px;
      height: 60px;
      float: left;
      transition: all 0.38s ease-out;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .card-panel-icon {
      font-size: 48px;
      width: 70px;
      height: 70px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 15px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .card-panel-num {
        font-size: 30px;
        padding-right: 10px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
