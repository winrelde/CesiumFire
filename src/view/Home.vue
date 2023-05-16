<script setup>
import CesiumContainer from '@/components/CesiumContainer.vue';
import Bottom from '../components/Bottom.vue';
import About from './About.vue';
</script>

<template>
    <div class="homeWrap">
        <CesiumContainer />
        <Bottom />
        <About />
    </div>
</template>

<style scoped>
.homeWrap{
    width: 100%;
    height: 100%;
    background-color: aqua;
}
</style>
