import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 按需引入vant
import { Button } from 'vant'
Vue.use(Button)

import 'lib-flexible/flexible'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
