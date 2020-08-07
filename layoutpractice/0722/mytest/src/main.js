import Vue from 'vue'
import App from './App.vue'

// 記得 import 我們所需要的工具
import TestComponent from './components/TestComponent'

import router from './router'
import store from './store'

Vue.config.productionTip = false


// global component 全域註冊
Vue.component('TestComponent',TestComponent)

// local component

new Vue({
  // 2 router index.js 設定好後 來這裡載進 router 


  router,

  store,
  render: h => h(App)
}).$mount('#app')
