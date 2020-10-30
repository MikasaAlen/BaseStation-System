import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import App from './App.vue';
import routers from "./Router"


Vue.use(ElementUI);
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: routers
})
new Vue({
  router,
  el: '#app',
  render: h => h(App)
});

