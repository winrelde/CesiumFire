import { createApp } from 'vue'
import './global.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vueAxios from 'vue-axios'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

createApp(App).use(router).use(store).use(vueAxios,axios).use(ElementPlus).mount('#app')
