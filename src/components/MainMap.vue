<script lang="ts" setup>
import { computed, inject, ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import type { Coord } from '@/types/http'
import { getAqiScatter } from '@/http' //空气质量散点图数据
import { convertToGeoJSON, getScatterColor } from '@/utils'
import { MT_scatter, CS } from '@/assets/ts'//空气质量-散点图层、颜色方案
import InfoWindow from '@/components/components/InfoWindow.vue'

// inject 注入
const location = inject<Ref<Coord>>('location')!
const mapCenter = inject<Ref<[number, number]>>('mapCenter')!
const scatterCode = inject<Ref<string>>('scatterCode')!

/* 高德地图主题
远山黛: amap://styles/whitesmoke
幻影黑: amap://styles/dark
雅士灰: amap://styles/grey
月光银: amap://styles/light
草色青: amap://styles/fresh
靛青蓝: amap://styles/blue
极夜篮: amap://styles/darkblue
马卡龙: amap://styles/macaron
涂鸦: amap://styles/graffiti
酱籽: amap://styles/wine
*/
// 地图主题
const mapStyle = computed(() => {
  return 'amap://styles/fresh'
})

// 地图点击事件 获得位置信息并更新 location
const handleClick = (e: any) => {
  console.log(e)
  location.value = {
    lat: e.lnglat.lat,
    lng: e.lnglat.lng,
  }
}
// 地图定位事件 获得位置信息并更新 location mapCenter
const handleLocationSuccess = async (statue: any) => {
  console.log(statue)
  let lat = statue.position.lat
  let lng = statue.position.lng
  location.value = { lat, lng }
  mapCenter.value = [lng, lat]
}


// 菜单项-散点图层
const scatterMenuItem = computed(() => {
  return MT_scatter.find((item) => {
    return item.code === scatterCode.value
  })
})
// 散点数据
const geoData = ref({})
// 散点样式
const layerStyle = ref({
  radius: 5,
  borderWidth: 0,
  color: (_: any, f: any) => {
    return getScatterColor(f.properties.value, CS[scatterCode.value].value, CS[scatterCode.value].color)
  },
})
// 获取散点数据
const getAqiScatterInfo = async () => {
  const res = await getAqiScatter(scatterCode.value)
  console.log(res)
  geoData.value = convertToGeoJSON(res.data)
  console.log(geoData.value)
}

watchEffect(() => {
  if (scatterMenuItem.value) {
    getAqiScatterInfo()
    // 散点样式
  }
})

const banglocation = 'src/assets/img/banglocation.png';

// 信息窗口是否可见
const visible = ref(false)
// 信息窗口位置
const infoPoint = ref([120, 31])
// 信息窗口内容
const infoContent = ref<string[]>([])
// 信息窗口颜色
const bordercolor = ref('')
// 鼠标移入散点显示信息窗口
const handleMousemove = (f: any) => {
  if (f) {
    visible.value = true
    infoPoint.value = f.coordinates
    infoContent.value = [f.properties.name, f.properties.value]
    bordercolor.value =
      getScatterColor(f.properties.value, CS[scatterCode.value].value, CS[scatterCode.value].color) || ''
  } else {
    visible.value = false
  }
}

</script>

<template>
  <div class="map">
    <!-- 地图组件 -->
    <el-amap class="gm-view" defaultCursor="grab" :zoom="4.8" :zooms="[4, 18]" :center="mapCenter" :resizeEnable="true"
      :mapStyle="mapStyle" @click="handleClick">
      <!-- 比例尺控件 -->
      <el-amap-control-scale />
      <!-- 缩放控件 -->
      <el-amap-control-tool-bar defaultCursor="pointer" />
      <!-- 定位控件 -->
      <el-amap-control-geolocation @complete="handleLocationSuccess" :showCircle="false" :showMarker="false"
        :zoomToAccuracy="false" />
      <!-- 点标记 -->
      <el-amap-marker :position="[location.lng, location.lat]" :icon="banglocation" />
      <!-- 信息窗体 -->
      <el-amap-info-window v-model:visible="visible" :position="infoPoint" :closeWhenClickMap="true" :isCustom="true">
        <InfoWindow :bordercolor="bordercolor">
          <div class="div" v-for="item in infoContent">{{ item }}</div>
        </InfoWindow>
      </el-amap-info-window>
      <!-- Loca图层 -->
      <el-amap-loca>
        <!-- 圆点图层 -->
        <el-amap-loca-point v-if="scatterCode" :source-data="geoData" :layer-style="layerStyle"
          @mousemove="handleMousemove" />
      </el-amap-loca>
    </el-amap>
  </div>
</template>

<style lang="scss" scoped>
/* 透明logo */
::v-deep .amap-logo {
  display: none;
  opacity: 0 !important;
}

/* 透明文字 */
::v-deep .amap-copyright {
  opacity: 0;
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: gray;
  z-index: 0;

  .gm-view {
    width: 100%;
    height: 100%;
  }
}
</style>
