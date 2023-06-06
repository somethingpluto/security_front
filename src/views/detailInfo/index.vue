<template>
  <div class="box">
    <el-card
      v-loading="reporterLoading"
      shadow="hover"
      style="width: 100%"
      element-loading-text="生成报告中...."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(235, 241, 246, 0.7)"
    >
      <div class="header">
        <el-image style="width: 50px;height: 50px" :src="require('../../../src/assets/images/report.png')" />
        <h2 style="margin-left: 10px">网络攻击类型分析报告</h2>
      </div>
      <div>
        <el-table
          :data="realTableData"
          border
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="attack_type"
            label="攻击类型"
            align="center"
          />
          <el-table-column
            prop="proportion"
            label="占总攻击的比例"
            align="center"
            width="140px"
          >
            <template slot-scope="scope">
              {{ formaluteProportion(scope.row.proportion) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="hazard_level"
            label="对计算机的危害"
            align="center"
          />
          <el-table-column
            prop="frequency"
            label="攻击频率"
            align="center"
            width="140px"
          /> <el-table-column
            prop="severity"
            label="总严重程度"
            align="center"
            width="140px"
          /> <el-table-column
            prop="grade"
            label="严重程度分级"
            align="center"
            width="140px"
          /> <el-table-column
            prop="measure"
            label="建议措施"
            align="center"
          />
        </el-table>
        <h3 style="text-indent: 2em">{{ realConclude }}</h3>
      </div>
      <div class="header">
        <el-image style="width: 50px;height: 50px" :src="require('../../../src/assets/images/suggestion.png')" />
        <h2 style="margin-left: 10px">措施建议</h2>
      </div>
      <div>
        <h3 style="text-indent: 2em">根据攻击类型分析结果，我们建议采取以下措施：</h3>
        <template v-for="(item,index) in realSuggestion">
          <div :key="index" style="display: flex;justify-content: left;align-items: center;line-height: 20px">
            <span>{{ index+1 }}</span>
            <span style="margin-left: 10px;font-size: 16px">{{ item }}</span>
          </div>
        </template>
      </div>
    </el-card>
  </div>
</template>

<script>

import { getReporterData } from '@/api/reporter'

export default {
  name: 'DetailInfo',
  data() {
    return {
      realTableData: [],
      realSuggestion: [],
      tableData: [{
        type: 'SSH-Bruteforce',
        num: '13%',
        harm: '高',
        frequency: '1次/分钟',
        severity: '80',
        level: '极端',
        method: '立即禁止IP地址'
      }, {
        type: 'DDoS attack-HOIC',
        num: '20%',
        harm: '非常高',
        frequency: '1次/小时',
        severity: '50',
        level: '严重',
        method: '增加带宽、使用防火墙'
      }, {
        type: 'Benign（良性流量）',
        num: '0%',
        harm: '无',
        frequency: '1次/天',
        severity: '0',
        level: '无',
        method: '无需采取措施'
      }, {
        type: 'Bot',
        num: '10%',
        harm: '高',
        frequency: '1次/分钟',
        severity: '60',
        level: '极端',
        method: '阻止流量并清除病毒'
      },
      {
        type: 'Dos attacks-GoldenEye',
        num: '15%',
        harm: '非常高',
        frequency: '1次/小时',
        severity: '135',
        level: '极端',
        method: '使用防火墙、增加带宽'
      }, {
        type: 'Infiltration',
        num: '42%',
        harm: '非常高',
        frequency: '1次/分钟',
        severity: '80',
        level: '极端',
        method: '立即禁止IP地址，并进行深入的检查'
      }, {
        type: '多种攻击类型同时攻击',
        num: '--',
        harm: '--',
        frequency: '--',
        severity: '--',
        level: '极端',
        method: '采取紧急措施，例如断电或隔离网络'
      }],
      suggestions: [
        '对于SSH-Bruteforce和Infiltration攻击类型，应立即禁止相应IP地址，并进行深入的检查，以防止进一步的攻击。',
        '对于DDoS attack-HOIC和Dos attacks-GoldenEye攻击类型，应增加带宽、使用防火墙等措施，以降低攻击的影响。',
        '对于Bot攻击类型，应阻止流量并清除病毒，以保护网络安全。',
        '对于多种攻击类型同时攻击的情况，建议采取紧急措施，例如断电或隔离网络，以防止进一步的损失。'
      ],
      conclude: '根据本次分析结果，Infiltration攻击类型占总攻击的比例最高，达到了42%；而多种攻击类型同时攻击的情况下，总严重程度达到了极端级别，需要采取紧急措施，例如断电或隔离网络。其他攻击类型的相应分析结果，请查看上表。',
      realConclude: '',
      reporterLoading: false
    }
  },
  mounted() {
    this.reporterLoading = true
    this.fetchData()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      console.log(row)
      if (row.hazard_level === '高') {
        return 'danger-row'
      } else if (row.hazard_level === '非常高') {
        return 'warning-row'
      }
      return ''
    },
    async fetchData() {
      await getReporterData().then((response) => {
        const data = response.data.data
        this.realTableData = data
        this.reporterLoading = false
      })
      // setTimeout(() => {
      //   this.realTableData = this.tableData
      //   this.reporterLoading = false
      // }, 3500)

      setTimeout(() => {
        this.realSuggestion = this.suggestions
      }, 3500)
      setTimeout(() => {
        this.realConclude = this.conclude
      }, 3500)
    },
    formaluteProportion(data) {
      const d = Math.round(data * 1000) / 10
      return d + '%'
    }
  }
}
</script>

<style scoped lang="scss">
.box{
  margin-top: 10px;
  margin-left: 10px;
}
.header{
  display: flex;
  justify-content: left;
  align-items: center;
}
</style>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .danger-row {
  background: #f0f9eb;
}
</style>

