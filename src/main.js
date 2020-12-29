import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import App from './App.vue';
import store from "./store/Store"
import routers from "./Router"
import VuejsDialog from "vuejs-dialog"
import VueAMap from "vue-amap"

import filter from "./utils/filter"


Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(filter)
Vue.use(VueAMap)
Vue.use(VuejsDialog)

VueAMap.initAMapApiLoader({
  key: '42e91cde7ac472738791a4e35a188e59',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geolocation'],
// 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
const router = new VueRouter({
  mode: 'history',
  routes: routers
})
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});

