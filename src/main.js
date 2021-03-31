import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/api'
import {cityTools} from './common/js/citys.js'
import '@/utils/filter'
import md5 from 'js-md5'
import 'lib-flexible/flexible'

// 按需引入vant
import { Button, Form, Field, Toast, ActionSheet, Icon, Swipe, SwipeItem, Notify, Tab, Tabs, PullRefresh, List, GoodsAction, GoodsActionIcon, GoodsActionButton, SwipeCell, CheckboxGroup, Checkbox, SubmitBar, Stepper, Popup, Card, AddressList, AddressEdit } from 'vant'
Vue.use(api).use(Button).use(Form).use(Field).use(Toast).use(ActionSheet).use(Icon).use(Swipe).use(SwipeItem).use(Notify).use(Tab).use(Tabs).use(PullRefresh).use(List).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(SwipeCell).use(CheckboxGroup).use(Checkbox).use(SubmitBar).use(Stepper).use(Popup).use(Card).use(AddressList).use(AddressEdit);

Vue.config.productionTip = false
Vue.prototype.$cityTools = cityTools;
Vue.prototype.$md5 = md5;
window.vRouter = router
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


