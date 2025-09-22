<script lang="ts" setup>
import { computed, inject, ref, watchEffect } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GaugeChart } from 'echarts/charts'
import VChart from 'vue-echarts'
import type { Ref } from 'vue'
import type { Coord } from '@/types/http'
import type { AqisData } from '@/types/aqiInfo'
import { getLocationAqiQuality } from '@/http'
import { getColor } from '@/utils'
import { AQI, BC } from '@/assets/ts'

use([CanvasRenderer, GaugeChart])

const location = inject<Ref<Coord>>('location')!

interface ListItem {
  name: string
  value: string
  color: string
}
const aqiList = ref<ListItem[]>([])
const aqiData = ref<AqisData>()
const updTime = ref('')
const getLocationAqiQualityInfo = async () => {
  const res = await getLocationAqiQuality(location.value)
  console.log(res)
  if (res.status !== 200) {
    return
  }
  aqiData.value = res.data.data
  if (aqiData.value) {
    AQI.map((item) => {
      const data = {
        name: item.name,
        value: parseFloat(aqiData.value![item.key]).toString(),
        color: getColor(parseFloat(aqiData.value![item.key])),
      }
      aqiList.value.push(data)
    })
  }

  updTime.value = res.data.data.D_DATETIME
}

watchEffect(() => {
  aqiList.value = []
  getLocationAqiQualityInfo()
})

const gaugeData = computed(() => {//仪表盘数据
  if (aqiData.value) {
    return [
      {
        value: parseFloat(aqiData.value.V_AQI),
        name: aqiData.value.V_QUAL,
      },
    ]
  } else {
    return [
      {
        value: 0,
        name: '———',
      },
    ]
  }
})

const axisLineColor = computed(() => {
  // 计算当前值相对于最大值的比例
  const ratio = gaugeData.value[0].value / 800
  const color = BC.find((item) => {
    return item[0] >= ratio
  })
  const arr = BC.filter((item) => {
    return item[0] < ratio
  })
  if (color) {
    return [...arr, [ratio, color[1]], [1, '#f3f5f7']]
  } else {
    return [...arr, [1, '#f3f5f7']]
  }
})

const option = ref({
  series: [
    {
      type: 'gauge',
      startAngle: 160,// 起始角度
      endAngle: 20,// 结束角度
      radius: '220%',// 仪表盘半径
      min: 0,// 刻度最小值
      max: 800,// 刻度最大值
      center: ['50%', '110%'],// 仪表盘位置
      splitNumber: 20,//分割段数
      axisLine: {// 仪表盘轴线
        lineStyle: {
          width: 0,
          color: axisLineColor,
        },
      },
      splitLine: {// 分割线样式
        length: '12%',
        lineStyle: {
          color: 'auto',
          width: 7,
        },
      },
      pointer: {// 指针样式
        show: false,
      },
      axisTick: {// 刻度样式
        show: false,
      },

      axisLabel: {// 刻度标签样式
        show: false,
      },
      title: {// 标题样式
        offsetCenter: [0, '-20%'],
        fontSize: 11,
      },
      detail: {// 仪表盘详情字体大小、偏移中心、值动画和颜色
        fontSize: 30,
        offsetCenter: [0, '-45%'],
        valueAnimation: true,
        color: '#47555d',
      },
      data: gaugeData,
    },
  ],
})
</script>

<template>
  <div class="air-quality">
    <div class="title">空气质量</div>
    <div class="aqi-echart">
      <v-chart class="chart" :option="option" autoresize />
    </div>
    <div class="aqi-list-wrap">
      <div class="aqis">
        <div class="item" v-for="item in aqiList" key="item.name">
          <div class="value">{{ item.value }}</div>
          <div class="color" :style="{ backgroundColor: item.color }"></div>
          <div class="type">{{ item.name }}</div>
        </div>
      </div>
      <div class="upd-time">更新时间:{{ updTime }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.air-quality {
  border: 1px solid #2eaf8b;

  .title {
    position: relative;
    margin: 3px 10px;
    font-size: 20px;
    font-weight: 700;
    padding-bottom: 2px;
    color: #0d7a3c;
  }

  .aqi-echart {
    height: 160px;
    margin: 0 10px;

    .charts {
      height: 100%;
    }
  }

  .aqi-list-wrap {
    margin: 0 5px;
    text-align: center;

    .aqis {
      height: 50px;
      display: flex;
      justify-content: space-around;

      .item {
        .value {
          font-size: 14px;
          line-break: 30px;
          font-weight: 600;
          color: #585858;
        }

        .color {
          width: 10px;
          height: 10px;
          border-radius: 7.5px;
          margin: 0 auto;
        }

        .type {
          font-size: 12px;
          color: #b6b6b6;
          line-height: 27px;
        }
      }
    }

    .upd-time {
      margin: 10px 0;
      font-size: 12px;
      color: #585858;
      font-weight: 400;
      vertical-align: baseline;
    }
  }
}
</style>
