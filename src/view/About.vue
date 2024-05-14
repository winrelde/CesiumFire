<script setup>
import { useStore } from 'vuex'
const store = useStore()
</script>
<template>
    <div class="aboutWrap" v-show="store.state.aboutDisplayState">
      <h2>林火蔓延系统</h2>
      <div class="aboutInfo">
        <div class="item">
          <span class="name">版本号：</span><span class="value">V1.0</span>
        </div>
        <div class="item">
          <span class="name">开发者：</span><span class="value">XXX</span>
        </div>
        <div class="item">
          <span class="name">更新日期：</span
          ><span class="value">2022-11-01</span>
        </div>
      </div>
    </div>
</template>
<style scoped>
.aboutWrap {
    position: absolute;
    top: 35vh;
    left: 50vw;
    width: 20vw;
    height: 20vh;
    transform: translate(-50%, -50%);
    color: #fff;
    background-color: rgba(4, 83, 139, 0.5);
    border: 1px solid rgb(244, 247, 248);
    border-radius: 0.7vw;
    z-index: 9999;
}
.aboutInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.aboutInfo .item {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 1vh;
}
.aboutInfo .name {
    flex: 0.3;
    padding-left: 1vw;
    text-align: center;
}
.aboutInfo .value {
    flex: 0.7;
    text-align: center;
}
</style>
  
