// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router/';
import store from './vuex/store.js';

// mintUI
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

// 环信
// import websdk from 'easemob-websdk';
// let webIM = window.WebIM = websdk;
// Vue.prototype.$WebIM = webIM;
// const imConn = new webIM.connection({
//     isMultiLoginSessions: webIM.config.isMultiLoginSessions,
//     https: typeof webIM.config.https === 'boolean' ? webIM.config.https : location.protocol === 'https:',
//     url: webIM.config.xmppURL,
//     heartBeatWait: webIM.config.heartBeatWait,
//     autoReconnectNumMax: webIM.config.autoReconnectNumMax,
//     autoReconnectInterval: webIM.config.autoReconnectInterval,
//     apiUrl: webIM.config.apiURL,
//     isAutoLogin: true
// })
// Vue.prototype.$imConn = imConn;

Vue.use(MintUI);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})