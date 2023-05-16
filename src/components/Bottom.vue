<script setup>
import { globalParams, initFire, addWildFire, addParticleFire, elevation } from '../utils/cesiumUtil'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus'
const store = useStore()
const router = useRouter()

const fireBtn = (type) => {
    switch (type){
        case 1:
            console.log('1')
            initFire()
            break;
        case 2:
            console.log('2')
            addWildFire(globalParams.viewer)
            break;
        case 3:
            console.log('3')
            ElMessage.error('未开发')
            break;
        case 4:
            console.log('4')
            addParticleFire()
            break;
    }
}
const systemInfo = () => {

    console.log('About')
    store.dispatch("setAboutDisplayStateAsync",true)
    setTimeout(() => {
        store.dispatch("setAboutDisplayStateAsync",false)
    }, 5000);

}

const logOut = () => {

    console.log('logOut')
    const confirmResult = ElMessageBox.confirm(
          '退出登录, 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
      ).then(()=>{
          window.sessionStorage.clear()
          router.push({ name: 'Login' })
      })
      .catch(err => err)
      if (confirmResult !== 'confirm') {
          return ElMessage.info('已取消退出')
      }

}

const loadElevation = () => {

    console.log('elevation')
    elevation()
}
</script>

<template>
  <div class="bottomWrap">
    <el-menu class="elMenu" mode="horizontal" text-color="#ffd04b" active-text-color="red">
        <el-menu-item index="1" @click="loadElevation(1)">等高线</el-menu-item>
        <el-sub-menu index="2">
            <template #title>林火蔓延</template>
            <el-menu-item index="2-1" @click="fireBtn(1)">初始化</el-menu-item>
            <el-menu-item index="2-2" @click="fireBtn(2)">Entity</el-menu-item>
            <el-menu-item index="2-3" @click="fireBtn(3)">CZML</el-menu-item>
            <el-menu-item index="2-4" @click="fireBtn(4)">粒子</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
            <template #title>系统管理</template>
            <el-menu-item index="3-1" @click="systemInfo()">关于系统</el-menu-item>
            <el-menu-item index="3-2" @click="logOut()">退出系统</el-menu-item>
        </el-sub-menu>
    </el-menu>
  </div>
</template>

<style scoped>
.bottomWrap {
    position: absolute;
    bottom: 5vh;
    left: 20vw;
    width: 60vw;
    height: 5vh;
    background-image: url('@/assets/bottom.png');
    background-size: cover;
}
.elMenu {
    margin-left: 20vw;
    width: 25vw;
    background-color: transparent;
}
.el-submenu__title:hover {
	background: #1890FF!important;
}
.el-menu-item:hover {
	background: #1890FF!important;
}
</style>