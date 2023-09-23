import 'bootstrap'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'

import App from './App.vue'
import store from './store'
import router from './router'

import 'element-plus/dist/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
