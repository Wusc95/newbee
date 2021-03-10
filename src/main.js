import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/api'
import '@/utils/filter'
import md5 from 'js-md5'
import 'lib-flexible/flexible'

// 按需引入vant
import { Button,Form,Field,Toast,ActionSheet,Icon,Swipe,SwipeItem,Notify,Tab, Tabs    } from 'vant'
Vue.use(api).use(Button).use(Form).use(Field).use(Toast).use(ActionSheet).use(Icon ).use(Swipe).use(SwipeItem ).use(Notify).use(Tab).use(Tabs);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


Vue.prototype.$md5=md5;
window.vRouter = router
