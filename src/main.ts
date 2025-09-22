import { createApp } from 'vue'
import '@/styles/gmap.scss'
import '@/styles/reset.scss'
import VueAMap, { initAMapApiLoader } from '@vuemap/vue-amap'
/* import { createPinia } from 'pinia' */
import VueAMapLoca from '@vuemap/vue-amap-loca'
import '@vuemap/vue-amap/dist/style.css'

initAMapApiLoader({
  key: 'c27183c486308a13c19a115be1a35840', // 使用自己的key
  securityJsCode: '22a6a1efe9c17902cfa4cd045d5cccb3', // 新版key需要配合安全密钥使用
  
  Loca: {
    version: '2.0.0',
  }, // 如果需要使用loca组件库，需要加载Loca
})


import App from './App.vue'

const app = createApp(App)
app.use(VueAMap)
app.use(VueAMapLoca)
/* app.use(createPinia()) */

app.mount('#app')
