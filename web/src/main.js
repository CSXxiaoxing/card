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
    if((size / 1024).toFixed(2) >= 5120 ){
        localStorage.setItem('oxTxtAll', "{}")
        localStorage.setItem('oxQun', "{}")
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
// socket连接后以uid登录
socket.on('connect', function () {
    console.log('socket连接成功')
    socket.emit('login', uid);
});

socket.on('new_msg', function (data) {  
    if(JSON.parse(data)){
        var data = JSON.parse(data)
    }
    switch(data.type){
        case 18:
            console.log(data)
            // alert(data.status)
        break;
    }    
});

if(!window.wdaaachen){   // 不存在rem则重新载入rem
    var wdaaachen = document.documentElement.clientWidth*window.devicePixelRatio/10;
    document.getElementsByTagName("html")[0].style.fontSize = wdaaachen + "px";
    var scale = 1/window.devicePixelRatio;
    var mstr = 'initial-scale='+ scale +', maximum-scale='+ scale +', minimum-scale='+ scale +', user-scalable=no';
    document.getElementById("vp").content = mstr;
}

// socket心跳包
var countSocket = 0;    // 心跳包
var countSocket02 = 0;
socket.emit('test_io', 10086);
socket.on('answer', function (data) {
    countSocket++
});
setInterval(()=>{
    countSocket02++
    if(countSocket02 > countSocket){    // 重连
        var socket = io(socketURL);
        var uid = localStorage.oxUid;
        socket.on('connect', function () {
            socket.emit('login', uid);
        });
    } else {
        countSocket02 = countSocket
    }
},2e4)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})