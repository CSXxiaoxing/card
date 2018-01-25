import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router/';
import store from './vuex/store.js';


// mintUI
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';


Vue.use(MintUI); 

// 容量检测
! function(){
    if(!window.localStorage) {
        console.log('浏览器不支持localStorage');
    }
    var size = 0;
    for(var item in window.localStorage) {
        if(window.localStorage.hasOwnProperty(item)) {
            size += window.localStorage.getItem(item).length;
        }
    }
    console.log('当前localStorage使用容量为' + (size / 1024).toFixed(2) + 'KB');
} ()
// 创建初始化聊天储存
// localStorage.setItem('oxTxtAll', "{}")
if(!localStorage.oxTxtAll){ // 单聊
  localStorage.setItem('oxTxtAll', "{}")
}
// localStorage.setItem('oxQun', "{}")
if(!localStorage.oxQun){ // 群聊
  localStorage.setItem('oxQun', "{}")
}



new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})