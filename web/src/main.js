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


// 连接服务端
var socket = io(socketURL); //这里当然填写真实的地址了
// uid可以是自己网站的用户id，以便针对uid推送以及统计在线人数
var uid = localStorage.oxUid;
// console.log(uid);
// socket连接后以uid登录
socket.on('connect', function () {
    console.log('socket连接成功')
    socket.emit('login', uid);
});

socket.on('new_msg', function (data) {  
    var data = JSON.parse(data);
    switch(data.type){
        case 10:
        break;
    }    
});
  // socket连接检测
socket.emit('test_io', 10086);
socket.on('answer', function (data) {
    // console.log(data)
    // console.log('socket依旧坚挺')
});


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})