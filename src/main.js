import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import md5 from 'js-md5'
import 'lib-flexible/flexible'

// 按需引入vant
import { Button,Form,Field,Toast,ActionSheet,Icon   } from 'vant'
Vue.use(Button).use(Form).use(Field).use(Toast).use(ActionSheet).use(Icon );

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


Vue.prototype.$md5=md5;
