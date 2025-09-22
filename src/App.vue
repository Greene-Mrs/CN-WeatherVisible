<script setup lang="ts">
import { provide, ref } from 'vue'
import MainMap from './components/MainMap.vue';
import Drawer from './components/components/Drawer.vue';
import LeftSide from '@/components/LeftSide.vue'
import Header from '@/components/Header.vue'
// 地图标点
const location = ref({ lng: 116.391512, lat: 39.905822 })
provide('location', location)
// 地图中心
const mapCenter = ref([104, 37])
provide('mapCenter', mapCenter)
//散点图
const scatterCode = ref('')
provide('scatterCode', scatterCode)
</script>

<template>
  <div class="container">
    <div class="header">
      <Header></Header>
    </div>

    <div class="body">
      <MainMap></MainMap>

      <!-- 抽屉组件 -->
      <Drawer width="20.8vw" direction="left">
        <LeftSide></LeftSide>
      </Drawer>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .body {
    position: relative;
    flex: 1;
    overflow: hidden;
  }
}
</style>
