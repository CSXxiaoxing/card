// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router/';

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

import store from './vuex/store.js';

Vue.use(MintUI);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})