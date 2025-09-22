<script lang="ts" setup>
import { inject, ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import type { Coord } from '@/types/http'
import AirQuality from './side/AirQuality.vue'

import { getLocationBaseElement, getLocationGeo, } from '@/http'
//获取天气要素、获取地理位置信息

import {
  formatAddress,
  formatWind,
  formatWins, //风速
} from '@/utils'

import Scroll from '@/components/components/Scroll.vue'

const location = inject<Ref<Coord>>('location')!

// 获取地理位置信息
const address = ref('')
const getLocationGeoInfo = async () => {
  const res = await getLocationGeo(location.value)
  if (res.status !== 200) {
    return
  }
  address.value = formatAddress(res) || ''
}
// 获取天气要素
const weatherType = ref('0')
const weaEle = ref({
  // 温度
  tem: '0',
  // 湿度
  rhu: '0',
  // 风速
  wins: '0',
  wins_text: '',
  // 风向
  wind: '0',
  wind_text: '',
})

const getLocationBaseEleInfo = async () => {
  const res = await getLocationBaseElement(location.value)
  console.log(res)
  if (res.status !== 200 || res.data.list.length === 0) {
    return
  }

  weaEle.value.tem = res.data.list[0].value
  weaEle.value.rhu = res.data.list[1].value
  weaEle.value.wins = res.data.list[2].value
  weaEle.value.wins_text = formatWins(parseFloat(res.data.list[2].value))
  weaEle.value.wind = res.data.list[3].value
  weaEle.value.wind_text = formatWind(parseFloat(res.data.list[3].value))
  weatherType.value = res.data.list[4].value
}


// 获取数据
const getInfo = () => {
  getLocationGeoInfo()
  getLocationBaseEleInfo()
}

watchEffect(() => {
  // initData()
  getInfo()
})

import { watch } from 'vue'
import type { ColorScaleItem } from '@/types/const'
import { CS, MT_scatter } from '@/assets/ts'//颜色刻度、散点图
import ColorScale from './ColorScale/ColorScale.vue'

const scatterCode = inject<Ref<string>>('scatterCode')!

const selectedScatterCode = ref('')

const handleClick = (e: MouseEvent, type: string) => {
  const target = e.target as HTMLElement
  const menuItem = target.closest('.menu-item')
  if (menuItem) {
    const code = menuItem.getAttribute('data-code')
    if (code) {
      if (type === 'tile') {
      } else {
        selectedScatterCode.value = selectedScatterCode.value === code ? '' : code
        scatterCode.value = scatterCode.value === code ? '' : code
      }
    }
  }
}

const colorScaleList = ref<ColorScaleItem[]>([])

watch(scatterCode, () => {
  colorScaleList.value = colorScaleList.value.filter((item) => {
    return item.type === 'tiles'
  })
  if (scatterCode.value) {
    colorScaleList.value.push(CS[scatterCode.value])
  } else {
  }
})

</script>

<template>
  <div class="side">
    <div class="local-info">
      <div class="city-name" :title="address">{{ address }}</div>
    </div>

    <div class="inner-padding">
      <Scroll>
        <div class="content">
          <div class="basic-element">

            <div class="top-info">
              <div class="temperature">{{ weaEle.tem }}</div>
              <div class="two-line">
                <div class="body-temperature-location">
                  <div class="degree-c">℃</div>
                </div>
              </div>
              <div class="secondeline">
                <div class="wind-direction">{{ weaEle.wind_text }}:{{ weaEle.wins_text }}</div>
                <div class="relative-humidity">湿度:{{ weaEle.rhu }}%</div>
              </div>
            </div>
          </div>
        </div>

        <div class="title">
          <div class="left-line"></div>
          <div class="text">空气质量</div>
          <div class="right-line"></div>
        </div>
        <ul class="scatter-box" @click="(e) => handleClick(e, 'scatter')">
          <li class="menu-item" v-for="item in MT_scatter" :key="item.code" :data-code="item.code"
            :class="{ selected: selectedScatterCode === item.code }">
            <div class="text">{{ item.name }}</div>
          </li>
        </ul>
        <AirQuality />
        <div class="Max-color-box">
          <div class="color-position">
            <div class="color">
              <ColorScale :item="item" v-for="item in colorScaleList" :key="item.code" />
            </div>
          </div>
        </div>
      </Scroll>
    </div>

    <!--  <div class="color-position">
      <div class="color">
        <ColorScale :item="item" v-for="item in colorScaleList" :key="item.code" />
      </div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.side {
  position: absolute;
  bottom: 0;
  top: 0;
  width: 400px;
  background-color: #fff;

  /*   .color-position {
    position: absolute;
    left: 560px;
    bottom: 30px;
    height: auto;

    .color {
      display: flex;
      flex-direction: column;
    }
  }
 */
}

.local-info {
  display: flex;
  position: relative;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #0c755f;
  background: #fff;
  border: 2px solid #78e0bd;

  .city-name {
    display: inline-block;
    width: 400px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
    font-size: 20px;
    line-height: 50px;
    font-weight: 1000;
  }
}

.inner-padding {
  border: 1px solid #e0e0e0;
  overflow: hidden;
  position: absolute;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;


  .content {
    height: auto;
    border: 1px solid #57b4a8;

    .basic-element {
      margin-top: 30px;

      .top-info {
        display: flex;
        position: relative;
        height: 52px;
        padding: 0 20px;
        overflow: hidden;

        .temperature {
          height: 40px;
          line-height: 40px;
          font-size: 50px;
          font-weight: 600;
          color: #6fbbb8;
          padding-right: 5px;
        }

        .two-line {
          .body-temperature-location {
            color: #0c755f;
            overflow: hidden;
            white-space: nowrap;
            padding: 2px 0 2px 0;

            .degree-c {
              color: #0c755f;
              font-size: 16px;
              line-height: 16px;
              font-weight: 600;
              margin-right: 4px;
            }
          }
        }

        .secondeline {
          display: flex;
          margin-top: 6px;
          padding-bottom: 1px;
          white-space: nowrap;
          overflow: hidden;

          .wind-direction,
          .relative-humidity {
            margin-top: 6px;
            font-size: 20px;
            font-weight: 600;
            color: #4fb59f;
            line-height: 14px;
            margin-right: 7px;
          }
        }
      }
    }

  }

  .title {
    display: flex;
    align-items: center;
    padding-top: 6px;
    width: 100%;
    height: 40px;
    background-color: #b6bbbb8a;
    border: 1px solid #5b9e27;

    .left-line {
      height: 2px;
      width: 32%;
      background: #fff;
    }

    .text {
      padding: 0 26px;
      color: #03604a;
      font-size: 20px;
      font-weight: 1000;
    }

    .right-line {
      width: 34%;
      height: 2px;
      background: #fff;
      flex: none;
    }
  }

  .menu-item {
    display: flex;
    position: relative;
    height: 40px;
    padding: 0 10px;
    background-color: #e2eaec8a;
    border: 1.5px solid #81dfe1;
    cursor: pointer;

    .text {
      font-size: 20px;
      line-height: 40px;
      color: #2a9678;
      text-align: center;
    }

  }

  .selected {
    .text {
      color: #db6e6e;
    }

    img {
      background-color: #efb245;
    }
  }

  .Max-color-box {
    position: absolute;
    display: flex;
    position: relative;
    height: 45px;
    padding: 0 10px;
    background-color: #b4dcd28a;
    border: 1.5px solid #81dfe1;

    .color-position {
      padding-top: 6px;
      left: 0;
      bottom: 30px;
      height: auto;

      .color {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
