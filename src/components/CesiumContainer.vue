<script setup>
import { onMounted } from 'vue';
import * as Cesium from 'cesium'
import { initViewer } from '@/utils/cesiumUtil'

onMounted(()=>{
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiY2ExNmYyOC0yYjk5LTRjOGMtYTI0ZC0xZmFmMDAwMzhlZDUiLCJpZCI6NTI1MjgsImlhdCI6MTYxODY2NjE5N30.ETTMOAYLjTMplvAxKehiZCrzT1o2s--bFqREAOSP3fg';
  initViewer("cesiumContainer")
})
</script>

<template>
  <div id="cesiumContainer"></div>
</template>

<style scoped>
#cesiumContainer{
  width: 100%;
  height: 100%;
}
</style>
